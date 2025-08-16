"use server";
import { ActionResponse } from "@/types/action-response";
import { User } from "@/types/user";
import { createClient } from "@/utils/supabase/server";

interface ActionResponseUser extends ActionResponse {
  user?: User;
}
export const getUserAction = async (): Promise<ActionResponseUser> => {
  const supabase = await createClient();
  const {
    error: errorAuth,
    data: { user: userAuth },
  } = await supabase.auth.getUser();

  if (errorAuth) {
    return {
      ok: false,
      message: errorAuth.message,
    };
  }
  if (!userAuth) {
    return { ok: false, message: "Usuario no autenticado" };
  }

  const { error, data: user } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", userAuth.id)
    .single();
  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
  return {
    ok: true,
    message: "Usuario encontrado",
    user: user,
  };
};
