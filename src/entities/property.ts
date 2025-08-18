import { Database } from "@/types/database";

type Property = Database["public"]["Tables"]["propiedades"]["Row"];
type State = Database["public"]["Tables"]["estados"]["Row"];
type City = Database["public"]["Tables"]["ciudades"]["Row"];
export type PropertyEntity = Property & {
  estados: State;
  ciudades: City;
};