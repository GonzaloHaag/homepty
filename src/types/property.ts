import * as yup from "yup";
import { SchemaProperty } from "@/schemas/property";
import { SchemaUnitProperty } from "@/schemas/unit";

export type Property = yup.InferType<typeof SchemaProperty>
export type UnitProperty = yup.InferType<typeof SchemaUnitProperty>
export interface UnitPropertyWithImages extends UnitProperty {
  fileUrls:File[];
}