import * as yup from "yup";
export const SchemaClient = yup.object({
  id_cliente: yup.number().optional(), // en Insert es opcional, no null
  id_usuario: yup.string().optional(), // en Insert es opcional, no null
  nombre_cliente: yup.string().required("Campo obligatorio"),
  email_cliente: yup.string().email().required("Campo obligatorio"),
  telefono_cliente: yup.string().required("Campo obligatorio"),

  dni_cif_cliente: yup.string().nullable().default(null),
  intereses_cliente: yup.string().nullable().default(null),
  nota_cliente: yup.string().nullable().default(null),

  presupuesto_desde_cliente: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" || o === null ? null : Number(o)))
    .default(null),
  presupuesto_hasta_cliente: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" || o === null ? null : Number(o)))
    .default(null),

  cantidad_banios: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" || o === null ? null : Number(o)))
    .default(null),
  cantidad_habitaciones: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" || o === null ? null : Number(o)))
    .default(null),
  cantidad_estacionamientos: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" || o === null ? null : Number(o)))
    .default(null),

  tipo_propiedad: yup.string().nullable().default(null),
  accion: yup.string().nullable().default(null),

  created_at: yup.string().optional(),
  updated_at: yup.string().optional(),
});
