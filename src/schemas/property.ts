import * as yup from "yup";

export const SchemaProperty = yup.object({
  descripcion_estado_propiedad: yup
    .string()
    .min(10, "Mínimo 10 caracteres")
    .required("Campo obligatorio"),
  direccion_propiedad: yup.string().required("Campo obligatorio"),
  id_accion_propiedad: yup
    .number()
    .integer("Debe ser un entero")
    .required("Campo obligatorio"),
  id_ciudad_propiedad: yup
    .number()
    .integer("Debe ser un entero")
    .required("Campo obligatorio"),
  id_estado_propiedad: yup
    .number()
    .integer("Debe ser un entero")
    .required("Campo obligatorio"),
  id_uso_propiedad: yup
    .number()
    .integer("Debe ser un entero")
    .required("Campo obligatorio"),
  colonia_propiedad: yup.string().nullable(),
  titulo_propiedad: yup.string().min(6, "Mínimo 6 caracteres").required(),
  tipo_propiedad: yup
    .string()
    .required("Campo obligatorio"),
  descripcion_propiedad: yup.string().required("Este campo es requerido"),
  area_construida_propiedad: yup.number().nullable().optional(),
  area_propiedad: yup.number().nullable().optional(),
  categoria_propiedad: yup.string().nullable().optional(),
  codigo_postal_propiedad: yup.string().nullable().optional(),
  created_at: yup.string().optional(),
  descripcion_inversion_propiedad: yup.string().nullable().optional(),
  fecha_cambio_status: yup.string().optional(),
  id_propiedad: yup.number().optional(),
  id_status_propiedad: yup.number().integer().nullable().optional(),
  id_zona_propiedad: yup.number().integer().nullable().optional(),
  image_url: yup.string().nullable().optional(),
  is_saved: yup.boolean().required().default(false),
  numero_plantas_propiedad: yup.number().integer().nullable().optional(),
  precio_propiedad: yup
    .number()
    .required("Campo obligatorio")
    .min(0, "El precio no puede ser negativo"),
  referencias_propiedad: yup.string().nullable().optional(),
  saved_by: yup.string().nullable().optional(),
  verificacion_documentos_propiedad: yup.string().nullable().optional(),
  amenidades: yup.array(yup.number().integer()).nullable(),
});
