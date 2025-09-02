"use client";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { LoaderCircleIcon } from "lucide-react";
import { createUnitAction } from "@/server/actions/unit";
import { StepOneFormUnit } from "./step-one-form-unit";
import { StepTwoFormUnit } from "./step-two-form-unit";
import { toast } from "sonner";
import { SchemaProperty } from "@/schemas/property";
import { Property } from "@/types/property";
import { useQueryClient } from "@tanstack/react-query";
const steps: {
  id: string;
  name: string;
  description: string;
  fields: string[];
}[] = [
  {
    id: "Paso 1",
    name: "Información básica de la unidad",
    description: "Colocá todos los detalles de la unidad",
    fields: [
      "tipo_propiedad",
      "titulo_propiedad",
      "id_accion_propiedad",
      "id_uso_propiedad",
      "descripcion_propiedad",
    ],
  },
  {
    id: "Paso 2",
    name: "Ubicacion y caracteristicas de la unidad",
    description: "Colocá la ubicación y características de la unidad",
    fields: [
      "id_estado_propiedad",
      "id_ciudad_propiedad",
      "direccion_propiedad",
      "precio_propiedad",
      "habitaciones_propiedad",
      "area_propiedad",
      "banios_propiedad",
    ],
  },
];
export const FormUnit = () => {
  const [previousStep, setPreviousStep] = useState(0);
  console.log(previousStep);
  const [currentStep, setCurrentStep] = useState(0);
  const [unitsImageUrls, setUnitsImageUrls] = useState<string[]>([]);
  const [unitsFileUrls, setUnitsFileUrls] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUnitsFileUrls([...unitsFileUrls, ...files]);
      const newImagesUrls = files.map((file) => URL.createObjectURL(file));
      setUnitsImageUrls([...unitsImageUrls, ...newImagesUrls]);
    }
  };

  const queryClient = useQueryClient();

  const {
    register,
    trigger,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<Property>({
    resolver: yupResolver(SchemaProperty) as Resolver<Property>,
  });

  type FieldName = keyof Property;
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
    const property: Property = {
      ...data,
      amenidades: data.amenidades?.map(Number) ?? null,
    };
    startTransition(async () => {
      const response = await createUnitAction(property, unitsFileUrls);
      if (!response.ok) {
        console.error(response.message);
        return;
      }
      toast.success("Unidad creada con éxito");
      setUnitsImageUrls([]);
      setUnitsFileUrls([]);
      reset();
      setCurrentStep(0);
      queryClient.invalidateQueries({ queryKey: ["properties_and_units"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    });
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 items-start gap-6">
      <div className="col-span-2 w-full">
        <h3 className="font-medium">
          {steps[currentStep].id}: {steps[currentStep].name}
        </h3>
      </div>
      {currentStep === 0 && (
        <StepOneFormUnit
          register={register}
          control={control}
          errors={errors}
          handleChange={handleChange}
          unitsImageUrls={unitsImageUrls}
        />
      )}
      {currentStep === 1 && (
        <StepTwoFormUnit
          register={register}
          control={control}
          errors={errors}
          watch={watch}
        />
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
          className="min-w-40"
          disabled={currentStep === steps.length - 1 && isPending} // deshabilita mientras se envía
        >
          {currentStep === steps.length - 1 ? (
            isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Crear unidad"
            )
          ) : (
            "Paso siguiente"
          )}
        </Button>
      </div>
    </form>
  );
};
