import * as yup from "yup";

export const SchemaOffer = yup.object({
  action: yup.string().required("Campo obligatorio"),
  min_price: yup.number().typeError("Debe ser un número").required("Campo obligatorio"),
  max_price: yup.number().typeError("Debe ser un número").required("Campo requerido"),
  ubicaciones: yup
    .array()
    .of(yup.string())
    .min(1, "Colocá al menos una ubicación")
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
      return value;
    }),
  tipos_propiedades: yup
    .array()
    .of(yup.string())
    .min(1, "Colocá al menos un tipo"),
  contacto: yup.string().nullable().default(null),
  nivel_urgencia: yup.string().required("Campo obligatorio"),
  notas_adicionales: yup.string().nullable().default(null),
});
