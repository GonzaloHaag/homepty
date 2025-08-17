"use server";
import { SchemaUserLogin } from "@/schemas/auth";
import { ActionResponse } from "@/types/action-response";
import { UserLogin } from "@/types/auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginUserAction = async (
  data: UserLogin
): Promise<ActionResponse> => {
    const validateData = SchemaUserLogin.validateSync(data, {
      abortEarly: false,
    });

    const supabase = await createClient();
    const { data: { user },error } = await supabase.auth.signInWithPassword({
      email: validateData.email,
      password: validateData.password,
    });

    if (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
    if(!user) {
      return {
        ok:false,
        message:"Usuario no logueado"
      };
    };
    const cookieStore = await cookies();
    cookieStore.set({
      name:"user_id",
      value:user.id,
      httpOnly:false,
      path:"/"
    });

    redirect("/");
};

export const logoutUserAction = async (): Promise<ActionResponse> => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  redirect("/auth/login");
};
