import { Database } from "@/types/database";

type Unit = Database["public"]["Tables"]["unidades"]["Row"];
type State = Database["public"]["Tables"]["estados"]["Row"];
type City = Database["public"]["Tables"]["ciudades"]["Row"];
export type UnitEntity = Unit & {
  estados?: State | null; // Son opcionales porque lo toma de la propiedad si es que tiene
  ciudades?: City | null;
};