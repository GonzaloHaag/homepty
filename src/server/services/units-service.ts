"use server";
import { UnitEntity } from "@/entities/unit";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ResponseGetUnitById extends ActionResponse {
  unit: UnitEntity | null;
}
interface ResponseGetUnits extends ActionResponse {
  data?: {
    unidades: UnitEntity[];
  };
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
export const getUnits = async ({
  byUserId,
  search,
}: {
  byUserId: boolean;
  search: string;
}): Promise<ResponseGetUnits> => {
  const supabase = await createClient();
  const query = supabase
    .from("unidades")
    .select(
      `
          *,
          estados(*),
          ciudades(*),
          unidades_imagenes(*)
        `
    )
    .is("id_propiedad", null);
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
