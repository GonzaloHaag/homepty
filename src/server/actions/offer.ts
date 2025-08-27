"use server";

import { OfferEntityInsert } from "@/entities/offer";
import { verifySession } from "@/lib/dal";
import { ActionResponse } from "@/types/action-response";
import { createClient } from "@/utils/supabase/server";
export const createOfferAction = async (
  offer: OfferEntityInsert
): Promise<ActionResponse> => {
  const session = await verifySession();

  const supabase = await createClient();
  const { error } = await supabase.from("ofertas").insert({
    ...offer,
    user_id: session.userId,
  });

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    message: "Oferta creada!",
  };
};

export const updateStatusOfferByIdAction = async (
  offerId: number,
  newStatus: "Activa" | "Pausada"
): Promise<ActionResponse> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("ofertas")
    .update({
      status: newStatus
    })
    .eq("id", offerId);

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    message: "Estado actualizado",
  };
};
