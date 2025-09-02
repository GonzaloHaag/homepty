import { Database } from "@/types/database";

export type ClientEntity = Database["public"]["Tables"]["clientes"]["Row"];
export type CreateClientEntity = Database["public"]["Tables"]["clientes"]["Insert"];