"use client";
import { use } from "react";
import { UnitEntity } from "@/entities/unit";
import { ErrorMessage } from "../error";
import { CardUnit } from "./card-unit";
interface UnitsContainerProps {
  units: Promise<{
    ok: boolean;
    message: string;
    data?: {
      unidades: UnitEntity[];
    };
  }>;
}
export const UnitsContainer = ({ units }: UnitsContainerProps) => {
  const responseUnits = use(units);
  if (!responseUnits.ok || !responseUnits.data) {
    return <ErrorMessage message="Error al cargar las unidades" />;
  }
  const { unidades } = responseUnits.data;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {unidades.map((unit) => (
         <CardUnit key={unit.id} unit={ unit } />
      ))}
    </section>
  );
};
