import { cache } from "react";
import "server-only";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export const verifySession = cache(async() => {
    const supabase = await createClient();
    const { data:{ user }} = await supabase.auth.getUser();
    if(!user) {
        redirect("/auth/login");
    }
    return {
        isAuth:true,
        userId: user.id
    };
});