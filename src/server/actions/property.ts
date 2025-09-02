"use server";
import { SchemaProperty } from "@/schemas/property";
import { SchemaUnitProperty } from "@/schemas/unit";
import { ActionResponse } from "@/types/action-response";
import { Property, UnitPropertyWithImages } from "@/types/property";
import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { verifySession } from "@/lib/dal";
interface CreatePropertyDevelopmentActionProps {
  property: Property;
  propertyFiles: File[];
  units: UnitPropertyWithImages[];
}
export const createPropertyDevelopmentAction = async ({
  property,
  propertyFiles,
  units,
}: CreatePropertyDevelopmentActionProps): Promise<ActionResponse> => {
  const session = await verifySession();
  const supabase = await createClient();
  // Paso 1: Subida de imagenes de la propiedad al storage
  const uploadPropertyImages = await Promise.all(
    propertyFiles.map(async (file) => {
      const { error, imageUrl } = await uploadImage({
        file: file,
        bucket: "properties_images",
      });
      if (error) {
        throw new Error("Error al subir las imagenes de la propiedad" + error);
      }

      return imageUrl;
    })
  );

  // Paso 2 -- Subir la propiedad
  const validatedDataProperty = SchemaProperty.validateSync(property, {
    abortEarly: true,
  });
  const { data: propiedad, error } = await supabase
    .from("propiedades")
    .insert({
      ...validatedDataProperty,
      amenidades: Array.isArray(validatedDataProperty.amenidades)
        ? validatedDataProperty.amenidades.filter(
            (n): n is number => typeof n === "number" && !isNaN(n)
          )
        : validatedDataProperty.amenidades,
      id_usuario: session.userId,
    })
    .select()
    .single();
  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  // Paso 3 -- Relacionar propiedad e imagenes de la misma
  const { error: errorPropiedadImagenes } = await supabase
    .from("propiedades_imagenes")
    .insert(
      uploadPropertyImages.map((uploadImage) => ({
        id_propiedad: propiedad.id_propiedad,
        image_url: uploadImage,
      }))
    );

  if (errorPropiedadImagenes) {
    return {
      ok: false,
      message: errorPropiedadImagenes.message,
    };
  }

  // Paso 4 -- Subir imagenes de la unidad
  const unitsImagesMap: { index: number; urls: string[] }[] = [];

  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    if (!unit.fileUrls || unit.fileUrls.length === 0) continue;

    const uploaded = await Promise.all(
      unit.fileUrls.map(async (file) => {
        const { error, imageUrl } = await uploadImage({
          file,
          bucket: "units_images",
        });

        if (error) {
          throw new Error("Error al subir las imágenes de la unidad" + error);
        }

        return imageUrl;
      })
    );

    unitsImagesMap.push({
      index: i, // para después mapear con el resultado insertado
      urls: uploaded,
    });
  }

  // Paso 5 -- Subir unidades --> Solo las que tienen asignada una propiedad iran aqui
  const cleanedUnits = units.map((unit) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fileUrls, ...unitData } = unit;
    return unitData;
  });
  const validatedUnits = cleanedUnits.map((unit) =>
    SchemaUnitProperty.validateSync(unit, { abortEarly: true })
  );
  const { data: unidades, error: errorUnidad } = await supabase
    .from("unidades_propiedades")
    .insert(
      validatedUnits.map((unit) => ({
        ...unit,
        area_unidad: unit.area_unidad ?? 0,
        banios_unidad: unit.banios_unidad ?? 0,
        estacionamientos_unidad: unit.estacionamientos_unidad ?? 0,
        habitaciones_unidad: unit.habitaciones_unidad ?? 0,
        id_usuario: session.userId,
        id_propiedad: propiedad.id_propiedad,
        id_estado: property.id_estado_propiedad,
        id_ciudad: property.id_ciudad_propiedad,
        direccion_unidad: property.direccion_propiedad,
        codigo_postal_unidad: property.codigo_postal_propiedad,
        colonia_unidad: property.colonia_propiedad,
        amenidades: null,
      }))
    )
    .select();

  if (errorUnidad) {
    return {
      ok: false,
      message: errorUnidad.message,
    };
  }

  // Paso 6 -- Relacionar unidades con sus imagenes
  const unidadesImagenes = unitsImagesMap.flatMap((u) => {
    const unidadInsertada = unidades[u.index];
    if (!unidadInsertada) return [];

    return u.urls.map((url) => ({
      id_unidad: unidadInsertada.id,
      image_url: url,
    }));
  });

  if (unidadesImagenes.length > 0) {
    const { error: errorUnidadesImagenes } = await supabase
      .from("unidades_propiedades_imagenes")
      .insert(unidadesImagenes);

    if (errorUnidadesImagenes) {
      return {
        ok: false,
        message: errorUnidadesImagenes.message,
      };
    }
  }
  return {
    ok: true,
    message: "Propiedad creada con exito",
  };
};

export const toggleSavedPropertyAction = async ({
  propertyId,
}: {
  propertyId: number;
}): Promise<ActionResponse> => {
  const session = await verifySession();
  const supabase = await createClient();

  const { data: propertySaved } = await supabase
    .from("propiedades_guardadas")
    .select("id_propiedad")
    .eq("id_propiedad", propertyId)
    .eq("id_usuario", session.userId)
    .single();

  if (propertySaved) {
    // Si esta guardada la elimino
    const { error } = await supabase
      .from("propiedades_guardadas")
      .delete()
      .eq("id_propiedad", propertyId)
      .eq("id_usuario", session.userId);
    if (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
    return {
      ok: true,
      message: "Propiedad eliminada de favoritos",
    };
  }
  const { error } = await supabase.from("propiedades_guardadas").insert({
    id_propiedad: propertyId,
    id_usuario: session.userId,
  });
  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
  return {
    ok: true,
    message: "Propiedad guardada en favoritos",
  };
};
