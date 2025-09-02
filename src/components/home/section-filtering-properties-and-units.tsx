"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiltersHome } from "./filters-home";
import { SectionPropertiesUnits } from "./section-properties-units";
import { getAllProperties } from "@/server/services";
export const SectionFilteringPropertiesAndUnits = () => {
  const [filters, setFilters] = useState({
    search: "",
    operation: 0,
    type: "todos",
  });
  const {
    data: propertiesAndUnits,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties_and_units", filters],
    queryFn: async () => {
      const response = await getAllProperties({
        byUserId: false,
        search: filters.search,
        operationId: filters.operation,
        type: filters.type,
      });

      if (!response.ok || !response.data) {
        throw new Error(response.message || "Error al cargar los datos");
      }

      return response.data.propiedades;
    },
    staleTime: 1000 * 60 * 60 * 2, // 2 horas
  });
  return (
    <div className="flex flex-col gap-y-2">
      <FiltersHome setFilters={setFilters} />
      <SectionPropertiesUnits
        propertiesAndUnits={propertiesAndUnits || []}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};
