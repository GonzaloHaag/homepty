"use server";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { SchemaProperty } from "@/schemas/property";
import { Property } from "@/types/property";
/** En realidad es lo mismo que crear una propiedad solamente que es is_unit ira en true y no va a tener nunca unidades asociadas */
export const createUnitAction = async (
  unit: Property,
  unitFiles: File[]
): Promise<ActionResponse> => {
  const session = await verifySession();
  const supabase = await createClient();
  // Paso 1 -- Subir imagenes de la unidad al storage
  const uploadUnitImages = await Promise.all(
    unitFiles.map(async (file) => {
      const { error, imageUrl } = await uploadImage({
        file,
        bucket: "units_images",
      });
      if (error) {
        throw new Error("Error al subir las imagenes de la unidad" + error);
      }
      return imageUrl;
    })
  );
  // Paso 2 -- Subir unidad

  const validatedUnit = SchemaProperty.validateSync(unit, { abortEarly: true });
  const { data: unidad, error: errorUnidad } = await supabase
    .from("propiedades")
    .insert({
      ...validatedUnit,
      id_usuario: session.userId,
      area_propiedad: unit.area_propiedad ?? 0,
      area_construida_propiedad: unit.area_construida_propiedad ?? 0,
      banios_propiedad: unit.banios_propiedad ?? 0,
      estacionamientos_propiedad: unit.estacionamientos_propiedad ?? 0,
      habitaciones_propiedad: unit.habitaciones_propiedad ?? 0,
      amenidades: null,
      is_unit:true
    })
    .select()
    .single();
  if (errorUnidad) {
    return {
      ok: false,
      message: errorUnidad.message,
    };
  }

  // Paso 3 - Relacionar unidad e imagenes de la misma

  const { error } = await supabase.from("propiedades_imagenes").insert(
    uploadUnitImages.map((uploadImage) => ({
      id_propiedad: unidad.id_propiedad,
      image_url: uploadImage,
    }))
  );

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  revalidatePath("/perfil");
  return {
    ok: true,
    message: "Unidad creada con éxito",
  };
};

