"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { TYPE_OPERATIONS, TYPES_PROPERTIES, TYPES_USES } from "@/utils/consts";
import { ErrorMessage } from "../error";
import { Input } from "../ui/input";
import { UploadIcon } from "lucide-react";
import { Property } from "@/types/property";
import Image from "next/image";

interface StepOneFormPropertyDevelopmentProps {
  register: UseFormRegister<Property>;
  control: Control<Property>;
  errors: FieldErrors<Property>;
  imageUrls: string[];
  setImageUrls: Dispatch<SetStateAction<string[]>>;
}
export const StepOneFormPropertyDevelopment = ({
  register,
  control,
  errors,
  imageUrls,
  setImageUrls
  
}: StepOneFormPropertyDevelopmentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click(); // dispara el input file oculto
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImagesUrls = files.map((file) => URL.createObjectURL(file));

      setImageUrls([...imageUrls, ...newImagesUrls]);
    }
  };
  return (
    <div className="grid grid-cols-2 items-start gap-6 w-full">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="id_accion_propiedad">Tipo de operación</Label>
        <div className="flex flex-col gap-y-1">
          <Controller
            name="id_accion_propiedad"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value?.toString() || ""}
                onValueChange={(val) => field.onChange(Number(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de operación" />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPERATIONS.map((operation) => (
                    <SelectItem
                      key={operation.id}
                      value={operation.id.toString()}
                    >
                      {operation.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.id_accion_propiedad && (
            <ErrorMessage message={errors.id_accion_propiedad.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="id_uso_propiedad">Tipo de uso *</Label>
        <div className="flex flex-col gap-y-1">
          <Controller
            name="id_uso_propiedad"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value?.toString() || ""}
                onValueChange={(val) => field.onChange(Number(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de uso" />
                </SelectTrigger>
                <SelectContent>
                  {TYPES_USES.map((use) => (
                    <SelectItem key={use.id} value={use.id.toString()}>
                      {use.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.id_uso_propiedad && (
            <ErrorMessage message={errors.id_uso_propiedad.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
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
                    <SelectItem
                      key={property.id}
                      value={property.label}
                    >
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
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="titulo_propiedad">Titulo de la propiedad *</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            type="text"
            placeholder="Ej: Torre residencial / Plaza comercial / Centro"
            {...register("titulo_propiedad")}
          />
          {errors.titulo_propiedad && (
            <ErrorMessage message={errors.titulo_propiedad.message!} />
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
            {imageUrls.length === 0 && (
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
                {imageUrls[index] ? (
                  <Image
                    src={imageUrls[index]}
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
        <Label htmlFor="descripcion_propiedad">Describe la propiedad *</Label>
        <div className="flex flex-col gap-y-1">
          <Textarea
            className="min-h-20 max-h-32"
            placeholder="Ej: Construcción de alta calidad..."
            {...register("descripcion_propiedad")}
          />
          {errors.descripcion_propiedad && (
            <ErrorMessage message={errors.descripcion_propiedad.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="descripcion_estado_propiedad">
          Describe el estado de la propiedad *
        </Label>
        <div className="flex flex-col gap-y-1">
          <Textarea
            className="min-h-20 max-h-32"
            placeholder="Ej: Construcción de alta calidad..."
            {...register("descripcion_estado_propiedad")}
          />
          {errors.descripcion_estado_propiedad && (
            <ErrorMessage
              message={errors.descripcion_estado_propiedad.message!}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="descripcion_inversion_propiedad">
          Describe la inversión de la propiedad
        </Label>
        <Textarea
          className="min-h-20 max-h-32"
          placeholder="Ej: Excelente oportunidad, alto retorno..."
          {...register("descripcion_inversion_propiedad")}
        />
      </div>
    </div>
  );
};
