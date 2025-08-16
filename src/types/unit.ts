import * as yup from "yup";
import { SchemaUnit } from "@/schemas/unit";

export type Unit = yup.InferType<typeof SchemaUnit>
export interface UnitWithImages extends Unit {
  fileUrls:File[];
}