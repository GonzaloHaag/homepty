"use server";
import { UserEntity } from "@/entities/user";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ActionResponseUser extends ActionResponse {
  user: UserEntity | null;
}
export const getUser = async (): Promise<ActionResponseUser> => {
  const session = await verifySession();
  const supabase = await createClient();
  const { error, data: user } = await supabase
    .from("usuarios")
    .select(`
      *,
      estados(*),
      ciudades(*)
      `)
    .eq("id", session.userId)
    .single();
  if (error) {
    return {
      ok: false,
      message: error.message,
      user:null
    };
  }
  return {
    ok: true,
    message: "Usuario encontrado",
    user: user,
  };
};