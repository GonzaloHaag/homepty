import { Database } from "../types/database";
import { City } from "./city";
import { State } from "./states";


type User = Database["public"]["Tables"]["usuarios"]["Row"];
export type UserEntity = User & {
    estados:State | null,
    ciudades:City | null
}