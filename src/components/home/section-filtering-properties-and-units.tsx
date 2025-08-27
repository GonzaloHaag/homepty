"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiltersHome } from "./filters-home";
import { SectionPropertiesUnits } from "./section-properties-units";
import { getPropertiesAndUnits } from "@/server/services";
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
    queryKey: ["propertiesAndUnits", filters],
    queryFn: async () => {
      const response = await getPropertiesAndUnits({
        byUserId: false,
        search: filters.search,
        operationId:filters.operation,
        type: filters.type
      });
      if (!response.ok || !response.data) return [];
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 2, // 2 horas
  });

  console.log(filters);
  return (
    <div className="flex flex-col gap-y-2">
      <FiltersHome setFilters={ setFilters } />
      <SectionPropertiesUnits propertiesAndUnits={ propertiesAndUnits || [] } isLoading={isLoading} isError={isError} />
    </div>
   
  );
};
