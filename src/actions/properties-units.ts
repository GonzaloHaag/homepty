"use server";

import { PropertyEntity } from "@/entities/property";
import { UnitEntity } from "@/entities/unit";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

export type CombinedItem =
  | { type: "property"; data: PropertyEntity }
  | { type: "unit"; data: UnitEntity };

interface getPropertiesAndUnitsResponse extends ActionResponse {
  data: CombinedItem[] | null;
}

export const getPropertiesAndUnits = async ({
  byUserId,
  search,
}: {
  byUserId: boolean;
  search: string;
}): Promise<getPropertiesAndUnitsResponse> => {
  let userId: string | undefined;
  if (byUserId) {
    const session = await verifySession();
    userId = session.userId;
  }

  const supabase = await createClient();

  // Preparar queries
  const queryP = supabase.from("propiedades").select(`
    *,
    estados(*),
    ciudades(*),
    propiedades_imagenes(*)
  `);
  const queryU = supabase.from("unidades").select(`
    *,
    estados(*),
    ciudades(*),
    unidades_imagenes(*)
  `);

  if (userId) {
    queryP.eq("id_usuario", userId);
    queryU.eq("id_usuario", userId);
  }
  if (search) {
    queryP.ilike("titulo_propiedad", `%${search}%`);
    queryU.ilike("nombre_unidad", `%${search}%`);
  }

  // Ejecutar en paralelo
  const [propResult, unitResult] = await Promise.all([queryP, queryU]);

  const { data: propiedades, error: errorPropiedades } = propResult;
  const { data: unidades, error: errorUnidades } = unitResult;

  if (errorPropiedades) {
    return { ok: false, message: errorPropiedades.message, data: null };
  }
  if (errorUnidades) {
    return { ok: false, message: errorUnidades.message, data: null };
  }

  // Combinar con type
  const combined: CombinedItem[] = [
    ...(propiedades?.map((p) => ({ type: "property" as const, data: p })) ?? []),
    ...(unidades?.map((u) => ({ type: "unit" as const, data: u })) ?? []),
  ];

  return {
    ok: true,
    message: "Propiedades y unidades obtenidas con éxito",
    data: combined,
  };
};
