import * as yup from "yup";
import { SchemaUserLogin} from "@/schemas/auth";

export type UserLogin = yup.InferType<typeof SchemaUserLogin>;