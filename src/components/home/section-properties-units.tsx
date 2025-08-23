"use client";
import { CardProperty } from "../property";
import { CardUnit } from "../unit";
import { ErrorMessage } from "../error";
import { CombinedItem } from "@/types/combined-item";
import { Skeleton } from "../ui/skeleton";

interface SectionPropertiesUnitsProps {
  isLoading: boolean;
  isError: boolean;
  propertiesAndUnits: CombinedItem[] | null;
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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {propertiesAndUnits!.length > 0 ? (
        propertiesAndUnits!.map((item) =>
          item.type === "property" ? (
            <CardProperty
              key={`property-${item.data.id_propiedad}`}
              property={item.data}
            />
          ) : (
            <CardUnit key={`unit-${item.data.id}`} unit={item.data} />
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
