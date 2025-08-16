import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { UploadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../error";
import { Unit, UnitWithImages } from "@/types/unit";
import { SchemaUnit } from "@/schemas/unit";
const steps: {
  id: string;
  name: string;
  description: string;
  fields: string[];
}[] = [
  {
    id: "Paso de",
    name: "Información básica",
    description: "Colocá todos los detalles de la unidad",
    fields: ["tipo_unidad", "nombre_unidad", "descripcion_unidad"],
  },
  {
    id: "Paso de",
    name: "Caracteristicas",
    description: "Colocá las caracteristicas de la propiedad",
    fields: ["area_unidad", "banios_unidad"],
  },
];
interface FormUnityProps {
  units: Unit[];
  addUnity: (unit: Unit) => void;
  handleOpenDialog: () => void;
  unitsImageUrls: string[];
  setUnitsImageUrls: Dispatch<SetStateAction<string[]>>;
}
export const FormUnity = ({
  units,
  addUnity,
  handleOpenDialog,
  unitsImageUrls,
  setUnitsImageUrls
}: FormUnityProps) => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click(); // dispara el input file oculto
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImagesUrls = files.map((file) => URL.createObjectURL(file));

      setUnitsImageUrls([...unitsImageUrls, ...newImagesUrls]);
    }
  };

  const {
    register,
    trigger,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaUnit),
  });

  type FieldName = keyof Unit;
  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((prev) => prev + 1);
    } else {
      await onSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = handleSubmit((data) => {
    addUnity(data);
    handleOpenDialog();
    setUnitsImageUrls([]);
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 items-start gap-6">
      {currentStep === 0 && (
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
                      <SelectItem value="Departamento">Departamento</SelectItem>
                      <SelectItem value="Local Comercial">
                        Local Comercial
                      </SelectItem>
                      <SelectItem value="Oficina">Oficina</SelectItem>
                      <SelectItem value="Lote">Lote</SelectItem>
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
            />
          </div>
          <div className="flex flex-col gap-y-2 col-span-2">
            <Label htmlFor="descripcion_inversion_unidad">
              Describe la inversión para esta unidad
            </Label>
            <Textarea
              className="min-h-20 max-h-40"
              placeholder="Ej: Excelente oportunidad de rendimiento..."
            />
          </div>
        </>
      )}
      {currentStep === 1 && (
        <>
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
              <Label htmlFor="area_unidad">Precio *</Label>
              <Input
                type="text"
                placeholder="Ej: 25.000"
                {...register("precio_unidad", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="area_unidad">Cant. Habitaciones</Label>
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
          <div className="flex flex-col gap-y-2 col-span-2 w-full">
            <Label htmlFor="caracteristicas_adicionales_unidad">
              Caracteristicas adicionales
            </Label>
            <Textarea
              className="min-h-20 max-h-40"
              placeholder="Aire acondicionado, seguridad 24hs..."
            />
          </div>
        </>
      )}

      <div className="flex items-center justify-between w-full col-span-2">
        <Button
          type="button"
          variant={"outline"}
          title="Paso anterior"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Paso anterior
        </Button>
        <Button
          type="button"
          onClick={nextStep}
          title={
            currentStep === steps.length - 1 ? "Crear unidad" : "Paso siguiente"
          }
        >
          {currentStep === steps.length - 1 ? "Crear unidad" : "Paso siguiente"}
        </Button>
      </div>
    </form>
  );
};
