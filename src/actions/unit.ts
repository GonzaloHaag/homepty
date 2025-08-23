"use server";
import { UnitWithImages } from "@/types/unit";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { SchemaUnit } from "@/schemas/unit";
import { UnitEntity } from "@/entities/unit";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";

export const createUnitAction = async (
  unit: UnitWithImages
): Promise<ActionResponse> => {
  const session = await verifySession();
  const supabase = await createClient();
  // Paso 1 -- Subir imagenes de la unidad al storage
  const uploadUnitImages = await Promise.all(
    unit.fileUrls.map(async (file) => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fileUrls, ...rest } = unit;

  const validatedUnit = SchemaUnit.validateSync(rest, { abortEarly: true });
  const { data: unidad, error: errorUnidad } = await supabase
    .from("unidades")
    .insert({
      ...validatedUnit,
      id_usuario: session.userId,
      area_unidad: unit.area_unidad ?? 0,
      banios_unidad: unit.banios_unidad ?? 0,
      estacionamientos_unidad: unit.estacionamientos_unidad ?? 0,
      habitaciones_unidad: unit.habitaciones_unidad ?? 0,
      id_propiedad: null, // aca se crea una unidad independiente, no tiene una propiedad asociada
      amenidades: null,
      direccion_unidad: unit.direccion_unidad,
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

  const { error } = await supabase.from("unidades_imagenes").insert(
    uploadUnitImages.map((uploadImage) => ({
      id_unidad: unidad.id,
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

interface ResponseGetUnits extends ActionResponse {
  data?: {
    unidades: UnitEntity[];
  };
}
export const getUnits = async ({
  byUserId,
  search,
}: {
  byUserId: boolean;
  search: string;
}): Promise<ResponseGetUnits> => {
  const supabase = await createClient();
  const query = supabase.from("unidades").select(`
          *,
          estados(*),
          ciudades(*),
          unidades_imagenes(*)
        `);
  if (byUserId) {
    const session = await verifySession();
    query.eq("id_usuario", session.userId);
  }
  if (search) {
    query.ilike("nombre_unidad", `%${search}%`);
  }

  const { data: unidades, error } = await query;

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
  return {
    ok: true,
    message: "Propiedades obtenidas con éxito",
    data: { unidades },
  };
};
interface ResponseGetUnitById extends ActionResponse {
  unit: UnitEntity | null;
}
export const getUnitById = async (id: number): Promise<ResponseGetUnitById> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("unidades")
    .select(
      `
          *,
          estados(*),
          ciudades(*),
          unidades_imagenes(*)
        `
    )
    .eq("id", id)
    .single();

  if (error) {
    return {
      ok: false,
      message: error.message,
      unit: null,
    };
  }

  return {
    ok: true,
    message: "Unidad obtenida con éxito",
    unit: data,
  };
};
