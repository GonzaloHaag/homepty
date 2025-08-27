"use server";
import { OfferEntity } from "@/entities/offer";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";

interface ActionResponseGetOffersByUserId extends ActionResponse {
  data: OfferEntity[] | null;
}
export const getOffersByUserId =
  async (): Promise<ActionResponseGetOffersByUserId> => {
    const session = await verifySession();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ofertas")
      .select("*")
      .eq("user_id", session.userId);
    if (error) {
      return {
        ok: false,
        message: error.message,
        data: null,
      };
    }

    return {
      ok: true,
      message: "Ofertas obtenidas",
      data,
    };
  };