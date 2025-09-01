"use client";
import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { LoaderCircleIcon, PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaUser } from "@/schemas/user";
import { UserEntity } from "@/entities/user";
import { ErrorMessage } from "../error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CITIES, STATES } from "@/utils/consts";
import { Textarea } from "../ui/textarea";
import { editUserAction } from "@/server/actions/user";
import { toast } from "sonner";
interface DialogEditProfileProps {
  user: UserEntity;
}
export const DialogEditProfile = ({ user }: DialogEditProfileProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleDialog = () => {
    setOpenDialog((prevState) => !prevState);
  };
  const {
    register,
    formState: { errors },
    control,
    watch,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SchemaUser),
    mode: "onSubmit",
    defaultValues: {
      nombre_usuario: user.nombre_usuario ?? "",
      telefono_usuario: user.telefono_usuario ?? "",
      email_usuario: user.email_usuario,
      actividad_usuario: user.actividad_usuario ?? "",
      id_estado: user.id_estado ?? undefined,
      id_ciudad: user.id_ciudad ?? undefined,
      descripcion_usuario: user.descripcion_usuario ?? "",
    },
  });
  const selectedState = watch("id_estado");
  const filteredCities = CITIES.filter(
    (city) => Number(city.id_estado) === Number(selectedState)
  );

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const response = await editUserAction(data);
      if (!response.ok) {
        console.error(response.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["user_info"] });
      toast.success("Usuario editado con éxito");
      handleDialog();
    });
  });
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"lg"} title="Editar">
          <PencilIcon /> Editar perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Colocá los detalles de tu perfil
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-6 items-start">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="nombre_usuario">Nombre de usuario *</Label>
            <div className="flex flex-col gap-y-1">
              <Input
                type="text"
                id="nombre_usuario"
                placeholder="Nombre de usuario"
                {...register("nombre_usuario")}
              />
              {errors.nombre_usuario && (
                <ErrorMessage message={errors.nombre_usuario.message!} />
              )}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="telefono_usuario">Teléfono</Label>
              <Input
                type="tel"
                id="telefono_usuario"
                placeholder="Teléfono"
                {...register("telefono_usuario")}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email_usuario">Email</Label>
              <Input
                value={user.email_usuario}
                disabled
                type="email"
                id="email_usuario"
                placeholder="Email"
                className="cursor-not-allowed"
                {...register("email_usuario")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="actividad_usuario">Actividad profesional *</Label>
            <Controller
              name="actividad_usuario"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona tu actividad profesional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asesor inmobiliario">
                      Asesor inmobiliario
                    </SelectItem>
                    <SelectItem value="Broker hipotecario">
                      Broker hipotecario
                    </SelectItem>
                    <SelectItem value="Constructor">Constructor</SelectItem>
                    <SelectItem value="Desarrollador">Desarrollador</SelectItem>
                    <SelectItem value="Arquitecto">Arquitecto</SelectItem>
                    <SelectItem value="Notario">Notario</SelectItem>
                    <SelectItem value="Inmobiliaria">Inmobiliaria</SelectItem>
                    <SelectItem value="Otra">Otra</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="id_estado">Estado *</Label>
              <div className="flex flex-col gap-y-1">
                <Controller
                  control={control}
                  name="id_estado"
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString() || ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATES.map((state) => (
                          <SelectItem
                            key={state.id}
                            value={state.id.toString()}
                          >
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.id_estado && (
                  <ErrorMessage message={errors.id_estado.message!} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="id_ciudad">Ciudad *</Label>
              <div className="flex flex-col gap-y-1">
                <Controller
                  control={control}
                  name="id_ciudad"
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString() || ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger
                        className="w-full"
                        disabled={!selectedState}
                      >
                        <SelectValue placeholder="Seleccionar ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCities.map((city) => (
                          <SelectItem
                            key={city.id}
                            value={city.id.toString() || ""}
                          >
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.id_ciudad && (
                  <ErrorMessage message={errors.id_ciudad.message!} />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="descripcion_usuario">Descripción</Label>
            <Textarea
              className="min-h-20 max-h-40"
              placeholder="Cuéntanos sobre ti ..."
              {...register("descripcion_usuario")}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant={"outline"}
                title="Cancelar"
                className="min-w-28"
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              title="Guardar"
              className="min-w-28"
              disabled={isPending}
            >
              {isPending ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Guardar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
