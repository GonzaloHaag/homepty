"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { SchemaUserLogin } from "@/schemas/auth";
import { ErrorMessage } from "../error";
import { LoaderCircleIcon } from "lucide-react";
import { loginUserAction } from "@/actions/auth";
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SchemaUserLogin),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
      const response = await loginUserAction(data);
      if(!response.ok) {
         console.error(response.message);
      }
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Ingresá tus credenciales para acceder al sistema
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <div className="flex flex-col gap-y-1">
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email && <ErrorMessage message={errors.email.message!} />}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="flex flex-col gap-y-1">
            <Input id="password" type="password" {...register("password")} disabled={isSubmitting} />
            {errors.password && (
              <ErrorMessage message={errors.password.message!} />
            )}
          </div>
        </div>
        <Button type="submit" className="w-full" title="Ingresar" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : "Ingresar"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            O continuar con
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg
            width="256"
            height="262"
            viewBox="0 0 256 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            />
          </svg>
          Ingresar con Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Aún no tienes contraseña?
        <Link
          href="/auth/register"
          title="registrarse"
          className="ml-2 underline underline-offset-4"
        >
          Registrarse
        </Link>
      </div>
    </form>
  );
};
