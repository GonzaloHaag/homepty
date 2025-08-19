import { Database } from "@/types/database";

type Property = Database["public"]["Tables"]["propiedades"]["Row"];
type State = Database["public"]["Tables"]["estados"]["Row"];
type City = Database["public"]["Tables"]["ciudades"]["Row"];
type PropertyImages = Database["public"]["Tables"]["propiedades_imagenes"]["Row"];
export type PropertyEntity = Property & {
  estados: State;
  ciudades: City;
  propiedades_imagenes?: PropertyImages[] | null; // Puede ser un array de imagenes o null si no tiene
};