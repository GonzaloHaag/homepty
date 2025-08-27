"use server";
import { PropertyEntity } from "@/entities/property";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ActionResponsePropertiesAndUnits extends ActionResponse {
  data?: {
    propiedades: PropertyEntity[];
  };
}
export const getProperties = async ({
  byUserId,
  search,
}: {
  byUserId: boolean;
  search: string;
}): Promise<ActionResponsePropertiesAndUnits> => {
  const supabase = await createClient();
  const query = supabase.from("propiedades").select(`
          *,
          estados(*),
          ciudades(*),
          propiedades_imagenes(*)
        `);
  if (byUserId) {
    const session = await verifySession();
    query.eq("id_usuario", session.userId);
  }
  if (search) {
    query.ilike("titulo_propiedad", `%${search}%`);
  }

  const { data: propiedades, error: errorPropiedades } = await query;

  if (errorPropiedades) {
    return {
      ok: false,
      message: errorPropiedades.message,
    };
  }
  return {
    ok: true,
    message: "Propiedades obtenidas con éxito",
    data: { propiedades },
  };
};
