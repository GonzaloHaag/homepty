"use server";
import { PropertyEntity } from "@/entities/property";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ResponseGetUnitById extends ActionResponse {
  unit: PropertyEntity | null;
}
interface ResponseGetUnits extends ActionResponse {
  data?: {
    unidades: PropertyEntity[];
  };
}
export const getUnitById = async (id: number): Promise<ResponseGetUnitById> => {
  const session = await verifySession();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("propiedades")
    .select(
      `
          *,
          estados(*),
          ciudades(*),
          propiedades_imagenes(*)
        `
    )
    .eq("id_propiedad", id)
    .eq("id_usuario",session.userId)
    .is("is_unit",true)
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
export const getUnits = async ({
  byUserId,
  search,
}: {
  byUserId: boolean;
  search: string;
}): Promise<ResponseGetUnits> => {
  const supabase = await createClient();
  const query = supabase
    .from("propiedades")
    .select(
      `
          *,
          estados(*),
          ciudades(*),
          propiedades_imagenes(*)
        `
    )
    .is("is_unit", true);
  if (byUserId) {
    const session = await verifySession();
    query.eq("id_usuario", session.userId);
  }
  if (search) {
    query.ilike("nombre_propiedad", `%${search}%`);
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
    message: "Unidades obtenidas con éxito",
    data: { unidades },
  };
};