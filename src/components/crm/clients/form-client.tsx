import { useTransition } from "react";
import { ErrorMessage } from "@/components/error";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SchemaClient } from "@/schemas/client";
import { TYPE_OPERATIONS, TYPES_PROPERTIES } from "@/utils/consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderCircleIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { createClientAction } from "@/server/actions/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface FormClientProps {
  handleDialog: () => void;
}
export const FormClient = ({ handleDialog }: FormClientProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(SchemaClient),
    mode: "onBlur",
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const response = await createClientAction(data);
      if (!response.ok) {
        toast.error("Error al guardar el cliente");
        console.log(response.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey:["clients" ]});
      handleDialog();
      toast.success("Cliente creado");
    });
  });
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-6 text-sm">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="nombre_cliente">Nombre*</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            type="text"
            placeholder="Nombre completo"
            {...register("nombre_cliente")}
          />
          {errors.nombre_cliente && (
            <ErrorMessage message={errors.nombre_cliente.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="email_cliente">Email*</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            type="text"
            placeholder="test@example.com"
            {...register("email_cliente")}
          />
          {errors.email_cliente && (
            <ErrorMessage message={errors.email_cliente.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="telefono_cliente">Teléfono*</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            type="text"
            placeholder="+342 9900022 "
            {...register("telefono_cliente")}
          />
          {errors.telefono_cliente && (
            <ErrorMessage message={errors.telefono_cliente.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="dni_cif_cliente">DNI/CIF</Label>
        <Input
          type="text"
          placeholder="DNI O CIF"
          {...register("dni_cif_cliente")}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="presupuesto_desde_cliente">Presupuesto desde</Label>
        <Input
          type="number"
          placeholder="Presupuesto minimo"
          {...register("presupuesto_desde_cliente")}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="presupuesto_hasta_cliente">Presupuesto hasta</Label>
        <Input
          type="number"
          placeholder="Presupuesto máximo"
          {...register("presupuesto_hasta_cliente")}
        />
      </div>
      <hr className="col-span-2 w-full" />
      <h4 className="text-lg font-semibold">Caracteristicas generales</h4>
      <div className="col-span-2 grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="id_tipo_propiedad">Tipo de propiedad *</Label>
          <div className="flex flex-col gap-y-1">
            <Controller
              name="tipo_propiedad"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString() || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar tipo de propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPES_PROPERTIES.map((property) => (
                      <SelectItem key={property.id} value={property.label}>
                        {property.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipo_propiedad && (
              <ErrorMessage message={errors.tipo_propiedad.message!} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="accion">Tipo de acción *</Label>
          <div className="flex flex-col gap-y-1">
            <Controller
              name="accion"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString() || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar tipo de accion" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_OPERATIONS.map((operation) => (
                      <SelectItem key={operation.id} value={operation.label}>
                        {operation.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.accion && <ErrorMessage message={errors.accion.message!} />}
          </div>
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-3 gap-6 items-start">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="cantidad_banios">Baños</Label>
          <Input
            type="number"
            placeholder="Cant baños"
            {...register("cantidad_banios")}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="cantidad_habitaciones">Habitaciones</Label>
          <Input
            type="number"
            placeholder="Cant habitaciones"
            {...register("cantidad_habitaciones")}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="cant_estacionamientos">Estacionamientos</Label>
          <Input
            type="number"
            placeholder="Cant estacionamientos"
            {...register("cantidad_estacionamientos")}
          />
        </div>
      </div>
      <div className="col-span-2 w-full flex flex-col gap-y-2">
        <Label htmlFor="Nota">Nota</Label>
        <Textarea
          className="min-h-20 max-h-40"
          placeholder="Notas adicionales sobre el cliente"
          {...register("nota_cliente")}
        />
      </div>
      <DialogFooter className="col-span-2">
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
  );
};
