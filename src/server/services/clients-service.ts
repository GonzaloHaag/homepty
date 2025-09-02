"use server";
import { ClientEntity } from "@/entities/client";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ActionResponseGetAllClients extends ActionResponse {
  data?: ClientEntity[];
}
export const getAllClients = async ({
  search,
  userId
}: {
  search: string;
  userId:string;
}): Promise<ActionResponseGetAllClients> => {
  const supabase = await createClient();

  const query = supabase
    .from("clientes")
    .select("*")
    .eq("id_usuario", userId);

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
