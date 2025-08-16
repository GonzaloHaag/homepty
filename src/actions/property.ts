"use server";

import { convertBlobUrlToFile } from "@/lib/utils";
import { SchemaProperty } from "@/schemas/property";
import { SchemaUnit } from "@/schemas/unit";
import { ActionResponse } from "@/types/action-response";
import { Property } from "@/types/property";
import { UnitWithImages } from "@/types/unit";
import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import * as yup from "yup";

interface CreatePropertyDevelopmentActionProps {
  property: Property;
  imageUrlsProperty: string[];
  units: UnitWithImages[];
}
export const createPropertyDevelopmentAction = async ({
  property,
  imageUrlsProperty,
  units,
}: CreatePropertyDevelopmentActionProps): Promise<ActionResponse> => {
  try {
    const supabase = await createClient();
    const {
      error: errorAuth,
      data: { user: userAuth },
    } = await supabase.auth.getUser();

    if (errorAuth) {
      return {
        ok: false,
        message: errorAuth.message,
      };
    }

    if (!userAuth) {
      return {
        ok: false,
        message: "No autorizado",
      };
    }

    // Crear propiedad
    const validatedProperty = SchemaProperty.validateSync(property, {
      abortEarly: false,
    });

    const { data: propiedad, error: errorPropiedad } = await supabase
      .from("propiedades")
      .insert({
        ...validatedProperty,
        id_usuario: userAuth.id,
      })
      .select()
      .single();
    if (errorPropiedad) {
      return {
        ok: false,
        message: errorPropiedad.message,
      };
    }

    // Guardar imagenes
    const urlsSave = await Promise.all(
      imageUrlsProperty.map(async (url) => {
        const imageFile = await convertBlobUrlToFile(url);
        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "properties_images",
        });
        if (error) {
          throw new Error("Error al guardar las imágenes de la propiedad");
        }
        return imageUrl;
      })
    );

    // Imagenes con propiedades, intermedia
    const { error: errorImages } = await supabase
      .from("propiedades_imagenes")
      .insert(
        urlsSave.map((url) => ({
          id_propiedad: propiedad.id_propiedad,
          image_url: url,
        }))
      );

    if (errorImages) {
      return {
        ok: false,
        message: errorImages.message,
      };
    }

    // Crear unidad

    const validatedUnits = units.map((unit) =>
      SchemaUnit.validateSync(unit, { abortEarly: false })
    );
    const { data: insertedUnits, error: errorUnit } = await supabase
      .from("unidades")
      .insert(
        validatedUnits.map((validatedUnit) => ({
          ...validatedUnit,
          id_usuario: userAuth.id,
          id_propiedad: propiedad.id_propiedad,
          area_unidad: validatedUnit.area_unidad ?? 0,
          banios_unidad: validatedUnit.banios_unidad ?? 0,
          habitaciones_unidad: validatedUnit.habitaciones_unidad ?? 0,
          estacionamientos_unidad: validatedUnit.habitaciones_unidad ?? 0,
        }))
      )
      .select();
    if (errorUnit) {
      return {
        ok: false,
        message: errorUnit.message,
      };
    }

    // Insertar imagenes unidades
    // Preparar todos los uploads de imágenes de unidades
    const unidadesImagenesPromises = units.flatMap((unit, index) => {
      const id_unidad = insertedUnits[index].id;
      return unit.imageUrls.map(async (url) => {
        const imageFile = await convertBlobUrlToFile(url);
        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "units_images",
        });
        if (error)
          throw new Error("Error al guardar las imágenes de la unidad");
        return { id_unidad, image_url: imageUrl };
      });
    });

    // Ejecutar todas las subidas en paralelo
    const unidadesImagenes = await Promise.all(unidadesImagenesPromises);

    // Insertar todas las imágenes de unidades en batch
    const { error: errorUnidadesImages } = await supabase
      .from("unidades_imagenes")
      .insert(unidadesImagenes);

    if (errorUnidadesImages) {
      return { ok: false, message: errorUnidadesImages.message };
    }

    return {
      ok: true,
      message: "Propiedad y unidades creadas.",
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        ok: false,
        message: "Data invalida",
      };
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
