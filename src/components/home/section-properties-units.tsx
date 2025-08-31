"use client";
import { CardProperty } from "../property";
import { CardUnit } from "../unit";
import { ErrorMessage } from "../error";
import { Skeleton } from "../ui/skeleton";
import { PropertyEntity } from "@/entities/property";


interface SectionPropertiesUnitsProps {
  isLoading: boolean;
  isError: boolean;
  propertiesAndUnits: PropertyEntity[];
}
export const SectionPropertiesUnits = ({
  isLoading,
  isError,
  propertiesAndUnits,
}: SectionPropertiesUnitsProps) => {
  if (isLoading) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="w-full min-h-[380px] animate-pulse rounded-lg shadow-md" />
        <Skeleton className="w-full min-h-[380px] animate-pulse rounded-lg shadow-md" />
        <Skeleton className="w-full min-h-[380px] animate-pulse rounded-lg shadow-md" />
      </section>
    );
  }
  if (isError) {
    return <ErrorMessage message={"Error al cargar los datos"} />;
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {propertiesAndUnits.length > 0 ? (
        propertiesAndUnits.map((item) =>
          item.is_unit ? (
            <CardUnit key={item.id_propiedad} unit={item} />
          ) : (
            <CardProperty
              key={item.id_propiedad}
              property={item}
            />
          )
        )
      ) : (
        <span className="text-sm text-muted-foreground">
          No se encontraron resultados
        </span>
      )}
    </section>
  );
};
