import { PropertyEntity } from "@/entities/property";
import { UnitEntity } from "@/entities/unit";

export type CombinedItem =
  | { type: "property"; data: PropertyEntity }
  | { type: "unit"; data: UnitEntity };