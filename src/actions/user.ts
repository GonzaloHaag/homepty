import { ActionResponse } from "@/types/action-response";
import { User } from "@/entities/user";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface ActionResponseUser extends ActionResponse {
  user?: User;
}
export const getUser = async (): Promise<ActionResponseUser> => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if(!userId) {
    return {
      ok:false,
      message:"No autorizado"
    };
  }
  const supabase = await createClient();
  const { error, data: user } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", userId)
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
