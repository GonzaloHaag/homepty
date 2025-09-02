"use server";
import { UserEntity } from "@/entities/user";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ActionResponseUser extends ActionResponse {
  user: UserEntity | null;
}
export const getUser = async ({ userId } : { userId:string }): Promise<ActionResponseUser> =>  {
  const supabase = await createClient();
  const { error, data: user } = await supabase
    .from("usuarios")
    .select(`
      *,
      estados(*),
      ciudades(*)
      `)
    .eq("id", userId)
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