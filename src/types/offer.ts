import * as yup from "yup";
import { SchemaOffer } from "@/schemas/offer";
export type Offer = yup.InferType<typeof SchemaOffer>