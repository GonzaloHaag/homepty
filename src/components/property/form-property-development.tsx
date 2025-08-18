"use client";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaProperty } from "@/schemas/property";
import { Property } from "@/types/property";
import { StepOneFormPropertyDevelopment } from "./step-one-form-property-development";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { StepTwoFormPropertyDevelopment } from "./step-two-form-property-development";
import { StepThreeFormPropertyDevelopment } from "./step-three-form-property-development";

import { createPropertyDevelopmentAction } from "@/actions/property";
import { LoaderCircleIcon } from "lucide-react";
import { UnitPropertyWithImages } from "@/types/unit";

const steps: {
  id: string;
  name: string;
  description: string;
  fields: string[];
}[] = [
  {
    id: "Paso 1",
    name: "Detalles generales",
    description: "Colocá todos los detalles de la propiedad",
    fields: [
      "id_accion_propiedad",
      "id_uso_propiedad",
      "tipo_propiedad",
      "titulo_propiedad",
      "descripcion_propiedad",
      "descripcion_estado_propiedad",
    ],
  },
  {
    id: "Paso 2",
    name: "Ubicación",
    description: "Colocá los datos de ubicación de la propiedad",
    fields: [
      "id_estado_propiedad",
      "id_ciudad_propiedad",
      "direccion_propiedad",
    ],
  },
  {
    id: "Paso 3",
    name: "Unidades",
    description: "Agrega al menos una unidad de la propiedad",
    fields: [],
  },
];
export const FormPropertyDevelopment = () => {
  const [previousStep, setPreviousStep] = useState(0);
  console.log(previousStep);
  const [currentStep, setCurrentStep] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fileUrls,setFileUrls] = useState<File[]>([]); // Imagenes a enviar al server action
  const [units, setUnits] = useState<UnitPropertyWithImages[]>([]);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
    watch,
    reset
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

  const addUnity = (unit: UnitPropertyWithImages) => {
    setUnits((prevState) => [...prevState, unit]);
  };

  const onSubmit = handleSubmit((data) => {
    if (!units || units.length === 0) {
      console.error("Debes agregar al menos una unidad");
      return;
    }
    startTransition(async() => {
      const response = await createPropertyDevelopmentAction({
        property: data,
        propertyFiles: fileUrls,
        units
      });
      if (!response.ok) {
        console.log(response.message);
        return;
      }

      console.log(response.message);
      reset();
      setCurrentStep(0);
      setImageUrls([]);
    });
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {steps[currentStep].id}: {steps[currentStep].name}
        </CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-y-6">
          {currentStep === 0 && (
            <StepOneFormPropertyDevelopment
              register={register}
              control={control}
              errors={errors}
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              fileUrls={fileUrls}
              setFileUrls={setFileUrls}
            />
          )}
          {currentStep === 1 && (
            <StepTwoFormPropertyDevelopment
              register={register}
              control={control}
              errors={errors}
              watch={watch}
            />
          )}
          {currentStep === 2 && (
            <StepThreeFormPropertyDevelopment
              units={units}
              addUnity={addUnity}
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
                currentStep === steps.length - 1
                  ? "Crear propiedad"
                  : "Paso siguiente"
              }
              className="min-w-40"
              disabled={currentStep === steps.length - 1 && isPending} // deshabilita mientras se envía
            >
              {currentStep === steps.length - 1 ? (
                isPending ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  "Crear propiedad"
                )
              ) : (
                "Paso siguiente"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
