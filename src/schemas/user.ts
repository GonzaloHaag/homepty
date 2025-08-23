import * as yup from "yup";
export const SchemaUser = yup.object({
    id:yup.string().nullable(),
    fecha_creacion:yup.date().nullable(),
    nombre_usuario: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres"),
    telefono_usuario: yup.string().nullable(),
    email_usuario:yup.string().email("Email inválido").required("Campo obligatorio"),
    imagen_perfil_usuario: yup.string().nullable(),
    banner_usuario: yup.string().nullable(),
    descripcion_usuario: yup.string().nullable(),
    estado_usaurio:yup.boolean().default(true),
    actividad_usuario: yup.string().required("Campo obligatorio"),
    id_estado: yup.number().required("Campo obligatorio"),
    id_ciudad: yup.number().required("Campo obligatorio")
});