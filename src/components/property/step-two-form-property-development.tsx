"use client";
import { Property } from "@/types/property";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ErrorMessage } from "../error";
import { Input } from "../ui/input";
import { AMENITIES, CITIES, STATES } from "@/utils/consts";

interface StepTwoFormPropertyDevelopmentProps {
  register: UseFormRegister<Property>;
  control: Control<Property>;
  errors: FieldErrors<Property>;
  watch: UseFormWatch<Property>;
}
export const StepTwoFormPropertyDevelopment = ({
  register,
  control,
  errors,
  watch,
}: StepTwoFormPropertyDevelopmentProps) => {
  const selectedState = watch("id_estado_propiedad");
  const filteredCities = CITIES.filter(
    (city) => Number(city.id_estado) === Number(selectedState)
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="id_estado_propiedad">Estado *</Label>
          <Controller
            control={control}
            name="id_estado_propiedad"
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
          {errors.id_estado_propiedad && (
            <ErrorMessage message={errors.id_estado_propiedad.message!} />
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="id_ciudad_propiedad">Ciudad *</Label>
          <div className="flex flex-col gap-y-1">
            <Controller
              control={control}
              name="id_ciudad_propiedad"
              render={({ field }) => (
                <Select
                  value={field.value?.toString() || ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger className="w-full" disabled={!selectedState}>
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
            {errors.id_ciudad_propiedad && (
              <ErrorMessage message={errors.id_ciudad_propiedad.message!} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="codigo_postal_propiedad">Código postal</Label>
          <Input
            type="text"
            placeholder="64000"
            {...register("codigo_postal_propiedad")}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 items-start gap-6">
        <div className="flex flex-col gap-2 col-span-2">
          <Label htmlFor="direccion_propiedad">
            Dirección (Calle y número) *
          </Label>
          <div className="flex flex-col gap-y-1">
            <Input
              type="text"
              placeholder="EJ: Av. Constitucion 2592"
              {...register("direccion_propiedad")}
            />
            {errors.direccion_propiedad && (
              <ErrorMessage message={errors.direccion_propiedad.message!} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="colonia_propiedad">Colonia</Label>
          <Input
            type="text"
            placeholder="EJ: Centro"
            {...register("colonia_propiedad")}
          />
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-0">
            <h4 className="font-semibold text-lg">Amenidades</h4>
            <span className="text-sm text-muted-foreground">Selecciona las amenidades generales que ofrece el desarrollo</span>
        </div>
        <div className="grid grid-cols-4 gap-6">
            {
                AMENITIES.map((amentity) => (
                    <Label key={amentity.id} htmlFor={amentity.nombre} className="flex items-center gap-x-2">
                        <div>
                            <Input type="checkbox" className="size-4" value={amentity.id} {...register("amenidades")} />
                        </div>
                        <span>{amentity.nombre}</span>
                    </Label>
                ))
            }
        </div>
      </div>
    </div>
  );
};
