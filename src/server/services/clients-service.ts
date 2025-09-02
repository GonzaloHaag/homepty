"use server";

import { ClientEntity } from "@/entities/client";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ActionResponseGetAllClients extends ActionResponse {
  data?: ClientEntity[];
}
export const getAllClients = async ({
  search,
}: {
  search: string;
}): Promise<ActionResponseGetAllClients> => {
  const session = await verifySession();
  const supabase = await createClient();

  const query = supabase
    .from("clientes")
    .select("*")
    .eq("id_usuario", session.userId);

  if (search !== "") {
    query.ilike("nombre_cliente", `%${search}%`);
  }

  const { data, error } = await query;
  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    message: "Clientes obtenidos",
    data,
  };
};
