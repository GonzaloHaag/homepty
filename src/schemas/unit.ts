import * as yup from "yup";
export const SchemaUnit = yup.object({
  id_unidad: yup.string().nullable(),
  tipo_unidad: yup.string().oneOf(["Departamento", "Local Comercial", "Oficina", "Lote"]).required("Campo obligatorio"),
  nombre_unidad: yup.string().required("Campo obligatorio"),
  descripcion_unidad: yup.string().required("Campo obligatorio").min(4, "Minimo 4 caracteres"),
  descripcion_estado_unidad: yup.string().nullable(),
  descripcion_inversion_unidad: yup.string().nullable(),
  area_unidad: yup.number().integer().positive("Debe ser positivo").required("Campo obligatorio"),
  precio_unidad: yup.number().positive().required("Campo obligatorio"),
  habitaciones_unidad: yup.number().integer().nullable(),
  banios_unidad: yup.number().integer().required("Campo obligatorio"),
  estacionamientos_unidad: yup.number().integer().nullable(),
  caracteristicas_adicionales_unidad: yup.string().nullable(),
  id_usuario: yup.number().integer().nullable(),
  id_propiedad: yup.number().integer().nullable()
});
