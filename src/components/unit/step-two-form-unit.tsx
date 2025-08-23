import { ErrorMessage } from "@/components/error";
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
import { Unit } from "@/types/unit";
import { AMENITIES, CITIES, STATES } from "@/utils/consts";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

interface StepTwoFormUnitProps {
  register: UseFormRegister<Unit>;
  control: Control<Unit>;
  errors: FieldErrors<Unit>;
  watch: UseFormWatch<Unit>;
}
export const StepTwoFormUnit = ({
  register,
  control,
  errors,
  watch,
}: StepTwoFormUnitProps) => {
  const selectedState = watch("id_estado");
  const filteredCities = CITIES.filter(
    (city) => Number(city.id_estado) === Number(selectedState)
  );
  return (
    <>
      <div className="col-span-2 grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="id_estado_unidad">Estado *</Label>
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
                    <SelectItem key={state.id} value={state.id.toString()}>
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
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="id_ciudad_unidad">Ciudad *</Label>
          <div className="flex flex-col gap-y-1">
            <Controller
              control={control}
              name="id_ciudad"
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
            {errors.id_ciudad && (
              <ErrorMessage message={errors.id_ciudad.message!} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="codigo_postal_unidad">Código postal</Label>
          <Input
            type="text"
            placeholder="64000"
            {...register("codigo_postal_unidad")}
          />
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-3 items-start gap-6">
        <div className="flex flex-col gap-2 col-span-2">
          <Label htmlFor="direccion_unidad">Dirección (Calle y número) *</Label>
          <div className="flex flex-col gap-y-1">
            <Input
              type="text"
              placeholder="EJ: Av. Constitucion 2592"
              {...register("direccion_unidad")}
            />
            {errors.direccion_unidad && (
              <ErrorMessage message={errors.direccion_unidad.message!} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="colonia_unidad">Colonia</Label>
          <Input
            type="text"
            placeholder="EJ: Centro"
            {...register("colonia_unidad")}
          />
        </div>
      </div>
      <div className="w-full col-span-2 grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="area_unidad">Área (m2) *</Label>
          <Input
            type="number"
            placeholder="Ej: 120"
            {...register("area_unidad", { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="precio_unidad">Precio *</Label>
          <Input
            type="text"
            placeholder="Ej: 25.000"
            {...register("precio_unidad", { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="habitaciones_unidad">Cant. Habitaciones</Label>
          <Input
            type="number"
            placeholder="Ej: 2"
            {...register("habitaciones_unidad", { valueAsNumber: true })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="banios_unidad">Baños *</Label>
        <Input
          type="number"
          placeholder="Ej: 2"
          {...register("banios_unidad", { valueAsNumber: true })}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="banios_unidad">Estacionamientos</Label>
        <Input
          type="number"
          placeholder="Ej: 2"
          {...register("estacionamientos_unidad", { valueAsNumber: true })}
        />
      </div>
      <div className="flex flex-col gap-y-4 w-full col-span-2">
        <div className="flex flex-col gap-y-0">
          <h4 className="font-semibold text-lg">Amenidades</h4>
          <span className="text-sm text-muted-foreground">
            Selecciona las amenidades generales que ofrece el desarrollo
          </span>
        </div>
        <div className="grid grid-cols-4 gap-6 w-full">
          {AMENITIES.map((amentity) => (
            <Label
              key={amentity.id}
              htmlFor={amentity.nombre}
              className="flex items-center gap-x-2"
            >
              <div>
                <Input
                  type="checkbox"
                  className="size-4"
                  value={amentity.id}
                  {...register("amenidades")}
                />
              </div>
              <span>{amentity.nombre}</span>
            </Label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2 w-full">
        <Label htmlFor="caracteristicas_adicionales_unidad">
          Caracteristicas adicionales
        </Label>
        <Textarea
          className="min-h-20 max-h-40"
          placeholder="Aire acondicionado, seguridad 24hs..."
          {...register("caracteristicas_adicionales_unidad")}
        />
      </div>
    </>
  );
};
