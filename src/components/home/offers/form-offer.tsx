"use client";
import { useEffect, useTransition } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { DialogFooter } from "../../ui/dialog";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "../../ui/multi-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOffer } from "@/schemas/offer";
import { TYPES_UNITS } from "@/utils/consts";
import { ErrorMessage } from "../../error";
import { createOfferAction } from "@/actions/offer";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
export const FormOffer = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SchemaOffer),
    defaultValues: {
      action: "Comprar",
      tipos_propiedades: [],
      min_price: undefined,
      max_price: undefined,
      ubicaciones: [],
      contacto: "",
      nivel_urgencia: "Baja",
      notas_adicionales: "",
    },
    mode: "onSubmit",
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    const dataToSend = {
      ...data,
      ubicaciones: data.ubicaciones?.filter((v): v is string => v !== undefined) ?? [],
      tipos_propiedades: data.tipos_propiedades?.filter(
        (v): v is string => v !== undefined
      ) ?? [],
    };
    startTransition(async () => {
      const response = await createOfferAction(dataToSend);
      if (!response.ok) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      reset();
    });
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-6 mt-4">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="action">Que quieres hacer?</Label>
        <Controller
          name="action"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value.toString()}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar acción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Comprar">Comprar</SelectItem>
                <SelectItem value="Alquilar">Alquilar</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="tipos_propiedades">Tipo(s) de propiedades *</Label>
        <div className="flex flex-col gap-y-1">
          <Controller
            name="tipos_propiedades"
            control={control}
            render={({ field }) => (
              <MultiSelect
                values={(field.value ?? []).filter(
                  (v): v is string => v !== undefined
                )}
                onValuesChange={(values) => field.onChange(values)}
              >
                <MultiSelectTrigger className="w-full">
                  <MultiSelectValue placeholder="Seleccionar tipos..." />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {TYPES_UNITS.map((type) => (
                      <MultiSelectItem key={type.id} value={type.label}>
                        {type.label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
            )}
          />
          {errors.tipos_propiedades && (
            <ErrorMessage message={errors.tipos_propiedades.message!} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="min_price">Precio minimo *</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            type="number"
            id="min_price"
            placeholder="Ej: 1000"
            {...register("min_price")}
          />
          {errors.min_price && (
            <ErrorMessage message={errors.min_price.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="max_price">Precio máximo *</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            type="number"
            id="max_price"
            placeholder="Ej: 5000"
            {...register("max_price")}
          />
          {errors.max_price && (
            <ErrorMessage message={errors.max_price.message!} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="ubicaciones">Ubicacion(es) de interés</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            type="text"
            placeholder="Aguacates, Aguas calientes"
            {...register("ubicaciones")}
          />
          {errors.ubicaciones && (
            <ErrorMessage message={errors.ubicaciones.message!} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="contacto">Método de contacto preferido</Label>
        <Input
          type="text"
          placeholder="Ej: test@example.com"
          {...register("contacto")}
        />
      </div>

      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="nivel_urgencia">Nivel de urgencia</Label>
        <Controller
          name="nivel_urgencia"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value.toString()}
              onValueChange={field.onChange}
              defaultValue="Baja"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baja">Baja (flexible)</SelectItem>
                <SelectItem value="Media">Media (próximos 3 meses)</SelectItem>
                <SelectItem value="Alta">Alta (inmediata)</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="notas_adicionales">Notas adicionales</Label>
        <Textarea
          placeholder="Colocá algún detalle importante a tener en cuenta"
          className="min-h-20 max-h-40"
          {...register("notas_adicionales")}
        />
      </div>
      <DialogFooter className="col-span-2">
        <Button
          type="submit"
          title="Guardar"
          className="w-32"
          disabled={isPending}
        >
          {isPending ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "Crear oferta"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};
