import * as yup from "yup";
import { SchemaUser } from "@/schemas/user";
export type User = yup.InferType<typeof SchemaUser>;