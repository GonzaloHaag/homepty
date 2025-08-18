import * as yup from "yup";
import { SchemaUnit, SchemaUnitProperty } from "@/schemas/unit";

export type Unit = yup.InferType<typeof SchemaUnit>
export type UnitProperty = yup.InferType<typeof SchemaUnitProperty>;
export interface UnitPropertyWithImages extends UnitProperty {
  fileUrls:File[];
}
export interface UnitWithImages extends Unit {
  fileUrls:File[];
}