"use server";
import { UserEntity } from "@/entities/user";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { User } from "@/types/user";
import { createClient } from "@/utils/supabase/server";

interface ActionResponseUser extends ActionResponse {
  user?: UserEntity;
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
    };
  }
  return {
    ok: true,
    message: "Usuario encontrado",
    user: user,
  };
};

export const editUserAction = async (user: User): Promise<ActionResponse> => {
  const session = await verifySession();
  const supabase = await createClient();
  const { error } = await supabase
    .from("usuarios")
    .update({
      nombre_usuario: user.nombre_usuario,
      telefono_usuario: user.telefono_usuario,
      email_usuario: user.email_usuario,
      actividad_usuario: user.actividad_usuario,
      id_estado: user.id_estado,
      id_ciudad: user.id_ciudad,
      descripcion_usuario: user.descripcion_usuario,
    })
    .eq("id", session.userId);

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
  return {
    ok: true,
    message: "Usuario actualizado",
  };
};
