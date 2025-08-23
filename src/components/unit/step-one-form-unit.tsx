import { ErrorMessage } from "@/components/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Unit } from "@/types/unit";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import { TYPES_UNITS } from "@/utils/consts";

interface StepOneFormUnitProps {
  register: UseFormRegister<Unit>;
  control: Control<Unit>;
  errors: FieldErrors<Unit>;
  unitsImageUrls: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const StepOneFormUnit = ({
  register,
  control,
  errors,
  unitsImageUrls,
  handleChange,
}: StepOneFormUnitProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click(); // dispara el input file oculto
  };
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="tipo_unidad">Tipo unidad *</Label>
        <div className="flex flex-col gap-y-1">
          <Controller
            name="tipo_unidad"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value?.toString() || ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="tipo_unidad" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {TYPES_UNITS.map((unit_type) => (
                    <SelectItem key={unit_type.id} value={unit_type.label}>
                      {unit_type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.tipo_unidad && (
            <ErrorMessage message={errors.tipo_unidad.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="nombre_unidad">Nombre de la unidad *</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            {...register("nombre_unidad")}
            type="text"
            placeholder="Ej: Tipo A, Piso 1 - Local 5"
          />
          {errors.nombre_unidad && (
            <ErrorMessage message={errors.nombre_unidad.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 col-span-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="imagenes">Imagenes generales *</Label>
          <Button type="button" variant="outline" onClick={handleClick}>
            <UploadIcon />
            Agregar fotos
          </Button>
          {/* Input oculto */}
          <Input
            type="file"
            ref={inputRef}
            onChange={handleChange}
            className="hidden" // ocultamos el input
            multiple
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="w-full flex items-center justify-start col-span-4">
            {unitsImageUrls.length === 0 && (
              <span className="text-sm text-muted-foreground">
                No hay imagenes subidas
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {unitsImageUrls[index] ? (
                  <Image
                    src={unitsImageUrls[index]}
                    width={140}
                    height={140}
                    alt={`img-${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <UploadIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="descripcion_unidad">Describe esta unidad *</Label>
        <div className="flex flex-col gap-y-1">
          <Textarea
            className="min-h-20 max-h-40"
            placeholder="Ej: Espectacular departamento con vista al mar..."
            {...register("descripcion_unidad")}
          />
          {errors.descripcion_unidad && (
            <ErrorMessage message={errors.descripcion_unidad.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="descripcion_estado_unidad">
          Describe el estado de esta unidad *
        </Label>
        <Textarea
          className="min-h-20 max-h-40"
          placeholder="Ej: Acabados de primera calidad..."
          {...register("descripcion_estado_unidad")}
        />
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="descripcion_inversion_unidad">
          Describe la inversión para esta unidad
        </Label>
        <Textarea
          className="min-h-20 max-h-40"
          placeholder="Ej: Excelente oportunidad de rendimiento..."
          {...register("descripcion_inversion_unidad")}
        />
      </div>
    </>
  );
};
