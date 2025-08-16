import * as yup from "yup";
import { SchemaProperty } from "@/schemas/property";

export type Property = yup.InferType<typeof SchemaProperty>