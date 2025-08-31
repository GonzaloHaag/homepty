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

interface ResponseIsPropertySaved extends ActionResponse {
   is_saved: boolean | null;
}
export const getProperties = async ({
  byUserId,
  search,
  operationId,
  type
}: {
  byUserId: boolean;
  search: string;
  operationId:number;
  type:string;
}): Promise<ActionResponsePropertiesAndUnits> => {
  const supabase = await createClient();
  const query = supabase.from("propiedades").select(`
          *,
          estados(*),
          ciudades(*),
          propiedades_imagenes(*)
        `).is("is_unit",false);
  if (byUserId) {
    const session = await verifySession();
    query.eq("id_usuario", session.userId);
  }
  if (search) {
    query.ilike("titulo_propiedad", `%${search}%`);
  }
  if(operationId !== 0) {
    query.eq("id_accion_propiedad",operationId);
  }
  if(type !== "todos") {
    query.eq("tipo_propiedad",type);
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
  byUserId,
  search,
  operationId,
  type
}: {
  byUserId: boolean;
  search: string;
  operationId:number;
  type:string;
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
  if(operationId !== 0) {
    query.eq("id_accion_propiedad",operationId);
  }
  if(type !== "todos") {
    query.eq("tipo_propiedad",type);
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

export const isPropertySaved = async ({ propertyId } : { propertyId:number }):Promise<ResponseIsPropertySaved> => {
  const session = await verifySession();
  const supabase = await createClient();
  const { data:savedProperty, error } = await supabase
  .from("propiedades_guardadas")
  .select("id_propiedad")
  .eq("id_usuario",session.userId)
  .eq("id_propiedad",propertyId)
  .single();
  if(error) {
    return {
      ok:false,
      message:error.message,
      is_saved: null
    };
  }

  if(!savedProperty) {
    return {
      ok:true,
      message:"Propiedad no guardada por el usuario actual",
      is_saved:false
    };
  }

  return {
    ok:true,
    message:"Propiedad guardada por el usuario actual",
    is_saved:true
  };
};
