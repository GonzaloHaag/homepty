"use client";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Unit, UnitWithImages } from "@/types/unit";
import { SchemaUnit } from "@/schemas/unit";
import { Resolver, useForm } from "react-hook-form";
import { LoaderCircleIcon } from "lucide-react";
import { createUnitAction } from "@/actions/unit";
import { StepOneFormUnit } from "./step-one-form-unit";
import { StepTwoFormUnit } from "./step-two-form-unit";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
    fields: ["tipo_unidad", "nombre_unidad", "descripcion_unidad"],
  },
  {
    id: "Paso 2",
    name: "Ubicacion y caracteristicas de la unidad",
    description: "Colocá la ubicación y características de la unidad",
    fields: [
      "id_estado",
      "id_ciudad",
      "direccion_unidad",
      "precio_unindad",
      "habitaciones_unidad",
      "area_unidad",
      "banios_unidad",
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
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUnitsFileUrls([...unitsFileUrls, ...files]);
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
    watch,
  } = useForm<Unit>({
    resolver: yupResolver(SchemaUnit) as Resolver<Unit>,
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
    const unitWithImages: UnitWithImages = {
      ...data,
      amenidades: data.amenidades?.map(Number) ?? null,
      fileUrls: unitsFileUrls, // las imágenes subidas en el modal
    };
    startTransition(async () => {
      const response = await createUnitAction(unitWithImages);
      if (!response.ok) {
        console.error(response.message);
        return;
      }
      setUnitsImageUrls([]);
      setUnitsFileUrls([]);
      router.push("/perfil");
      toast.success("Unidad creada con éxito");
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
                currentStep === steps.length - 1
                  ? "Crear unidad"
                  : "Paso siguiente"
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
