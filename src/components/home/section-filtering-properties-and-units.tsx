"use client";
import {
  CombinedItem,
  getPropertiesAndUnits,
} from "@/actions/properties-units";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage } from "../error";
import { useState } from "react";
import { FiltersHome } from "./filters-home";
import { SectionPropertiesUnits } from "./section-properties-units";
interface SectionFilteringPropertiesAndUnitsProps {
  data: CombinedItem[] | null;
}
export const SectionFilteringPropertiesAndUnits = ({
  data,
}: SectionFilteringPropertiesAndUnitsProps) => {
  const [filters, setFilters] = useState({
    search: "",
    operation: "todas",
    type: "todos",
  });
  const {
    data: propertiesAndUnits,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["propertiesAndUnits"],
    queryFn: async () => {
      const response = await getPropertiesAndUnits({
        byUserId: false,
        search: "",
      });
      if (!response.ok || !response.data) return [];
      return response.data; // <-- solo el array
    },
    staleTime: 1000 * 60 * 60 * 2, // 2 horas
    initialData: data,
  });

  if (isFetching) {
    return (
      <span className="text-muted-foreground text-sm">Cargando datos...</span>
    );
  }
  if (isError) {
    return <ErrorMessage message={"Error al cargar los datos"} />;
  }
  return (
    <div className="flex flex-col gap-y-6">
      <FiltersHome />
      <SectionPropertiesUnits propertiesAndUnits={ propertiesAndUnits } />
    </div>
   
  );
};
