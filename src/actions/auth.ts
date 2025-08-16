"use server";
import { SchemaUserLogin } from "@/schemas/auth";
import { ActionResponse } from "@/types/action-response";
import { UserLogin } from "@/types/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const loginUserAction = async (
  data: UserLogin
): Promise<ActionResponse> => {
    const validateData = SchemaUserLogin.validateSync(data, {
      abortEarly: false,
    });

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: validateData.email,
      password: validateData.password,
    });

    if (error) {
      return {
        ok: false,
        message: error.message,
      };
    }

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
