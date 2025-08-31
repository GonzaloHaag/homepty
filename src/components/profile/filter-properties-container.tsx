"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "@/server/services";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PropertiesContainer } from "./properties-container";
import { TYPES_PROPERTIES } from "@/utils/consts";
export const FilterPropertiesContainer = ({ ids_propiedades_guardadas } : { ids_propiedades_guardadas:number[] }) => {
  const [type, setType] = useState("todos");
  const {
    data: propiedades,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties", type],
    queryFn: async () => {
      const response = await getAllProperties({
        byUserId: true,
        search: "",
        operationId: 0,
        type: type,
      });

      if (!response.ok || !response.data) {
        throw new Error(response.message || "Error al cargar los datos");
      }

      return response.data.propiedades;
    },
    staleTime: 1000 * 60 * 60 * 2, // 2 horas
  });
   

  const handleTypeChange = (type: string) => {
    setType(type);
  };
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-lg">Mis propiedades y unidades</h4>
        <Select
          defaultValue="todos"
          value={type}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            {TYPES_PROPERTIES.map((type) => (
              <SelectItem key={type.id} value={type.label}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <PropertiesContainer
        properties={propiedades || []}
        isLoading={isLoading}
        isError={isError}
        ids_propiedades_guardadas={ids_propiedades_guardadas}
      />
    </div>
  );
};
