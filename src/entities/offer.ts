import { Database } from "@/types/database";

export type OfferEntityInsert = Database["public"]["Tables"]["ofertas"]["Insert"];
export type OfferEntity = Database["public"]["Tables"]["ofertas"]["Row"];