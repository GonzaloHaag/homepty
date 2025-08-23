"use client";
import { FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TYPE_OPERATIONS, TYPES_UNITS } from "@/utils/consts";
import { Input } from "../ui/input";
import { FunnelIcon, SearchIcon } from "lucide-react";
import { FilterRangePrice } from "./filter-range-price";
import { Button } from "../ui/button";
export const FiltersHome = () => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-3 gap-4">
      <div className="relative">
        <Input
          type="search"
          placeholder={"Buscar por nombre..."}
          className="peer pl-10"
          name="search"
        />
        <SearchIcon
          size={20}
          className="absolute left-3 text-gray-500 peer-focus:text-gray-900 mx-0 my-auto top-0 bottom-0"
        />
      </div>
      <Select defaultValue="todas" name="operation">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar operación" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas las operaciones</SelectItem>
          {TYPE_OPERATIONS.map((operation) => (
            <SelectItem key={operation.id} value={operation.label}>
              {operation.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="todos" name="type">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos los tipos</SelectItem>
          {TYPES_UNITS.map((type) => (
            <SelectItem key={type.id} value={type.label}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="w-full max-w-max flex items-center gap-4 mb-6">
        <FilterRangePrice />
        <Button type="button" variant={"outline"} title="más filtros">
          <FunnelIcon /> Más filtros
        </Button>
        <Button type="submit" title="Buscar" className="min-w-32">
          <SearchIcon /> Buscar
        </Button>
      </div>
    </form>
  );
};
