"use server";
import { CreateClientEntity } from "@/entities/client";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

export const createClientAction = async (
  data: CreateClientEntity
): Promise<ActionResponse> => {
  const session = await verifySession();
  const supabase = await createClient();

  const { error } = await supabase.from("clientes").insert({
    ...data,
    id_usuario: session.userId,
  });

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    message: "Cliente creado con éxito",
  };
};
