"use server";
import { PropertyEntity } from "@/entities/property";
import { UnitProperty } from "@/entities/unit_property";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ActionResponseGetProperties extends ActionResponse {
  data?: {
    propiedades: PropertyEntity[] & {
      unidades_propiedades?: UnitProperty[];
    };
  };
}
interface ActionResponseGetAllProperties extends ActionResponse {
  data?: {
    propiedades: PropertyEntity[];
  };
}

interface ActionResponseGetSavedProperties extends ActionResponse {
  data?: {
    ids_propiedades_guardadas: number[];
  };
}

interface ActionResponseGetPropertyById extends ActionResponse {
  data?: {
    propiedad: PropertyEntity;
  };
}
export const getProperties = async ({
  search,
  operationId,
  type,
}: {
  search: string;
  operationId: number;
  type: string;
}): Promise<ActionResponseGetProperties> => {

  const supabase = await createClient();
  const query = supabase
    .from("propiedades")
    .select(
      `
          *,
          estados(*),
          ciudades(*),
          propiedades_imagenes(*),
          unidades_propiedades(*)
        `
    )
    .is("is_unit", false);
 
  if (search) {
    query.ilike("titulo_propiedad", `%${search}%`);
  }
  if (operationId !== 0) {
    query.eq("id_accion_propiedad", operationId);
  }
  if (type !== "todos") {
    query.eq("tipo_propiedad", type);
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

export const getAllProperties = async ({
  userId,
  search,
  operationId,
  type,
}: {
  userId?:string
  search: string;
  operationId: number;
  type: string;
}): Promise<ActionResponseGetAllProperties> => {
  const supabase = await createClient();
  const query = supabase.from("propiedades").select(`
          *,
          estados(*),
          ciudades(*),
          propiedades_imagenes(*)
        `);
  if (userId) {
    query.eq("id_usuario", userId);
  }
  if (search) {
    query.ilike("titulo_propiedad", `%${search}%`);
  }
  if (operationId !== 0) {
    query.eq("id_accion_propiedad", operationId);
  }
  if (type !== "todos") {
    query.eq("tipo_propiedad", type);
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

export const getSavedProperties =
  async (): Promise<ActionResponseGetSavedProperties> => {
    const session = await verifySession();
    const supabase = await createClient();
    const { data: savedProperties, error } = await supabase
      .from("propiedades_guardadas")
      .select("id_propiedad")
      .eq("id_usuario", session.userId);
    if (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
    return {
      ok: true,
      message: "Propiedades guardadas obtenidas",
      data: {
        ids_propiedades_guardadas: savedProperties.map((p) => p.id_propiedad),
      },
    };
  };

export const getPropertyById = async ({
  propertyId,
}: {
  propertyId: number;
}): Promise<ActionResponseGetPropertyById> => {
  const session = await verifySession();
  const supabase = await createClient();
  const { data: property, error } = await supabase
    .from("propiedades")
    .select(
      `
          *,
          estados(*),
          ciudades(*),
          propiedades_imagenes(*),
          unidades_propiedades(*)
        `
    )
    .eq("id_propiedad", propertyId)
    .eq("id_usuario", session.userId)
    .is("is_unit", false)
    .single();

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    message: "Propiedad obtenida",
    data: { propiedad: property },
  };
};
