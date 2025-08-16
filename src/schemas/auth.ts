import * as yup from "yup";

export const SchemaUserLogin = yup.object({
  email: yup.string().email("Formato inválido").required("Este campo es requerido"),
  password: yup.string().required("La contraseña es requerida").min(6,"Minimo 6 caracteres")
});
