"use client";
import { TableClients } from "@/components/crm";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/use-debounce";
import { getAllClients } from "@/server/services";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

export const PageClient = ({ userId } : { userId:string }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue);
  const fetchClients = async () => {
    const response = await getAllClients({ search: debouncedSearch, userId });
    if (!response.ok || !response.data) {
      throw new Error("Error al obtener los clientes");
    }
    return response.data;
  };
  const {
    data: clientes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clients", debouncedSearch, userId],
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 60 * 2, // 2 horas
  });

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <CardContent className="flex flex-col gap-y-4">
      <div className="grid grid-cols-2 items-start gap-6">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="filtro_titulo">Filtrar por nombre</Label>
          <form className="relative w-full">
            <Input
              type="search"
              placeholder="Buscar por nombre del cliente"
              className="peer pl-10"
              value={searchValue}
              onChange={handleSearchValue}
            />
            <SearchIcon
              size={20}
              className="absolute left-3 text-gray-500 peer-focus:text-gray-900 mx-0 my-auto top-0 bottom-0"
            />
          </form>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Nombre
              </th>
              <th scope="col" className="px-6 py-4">
                Email
              </th>
              <th scope="col" className="px-6 py-4">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-4">
                DNI/CIF
              </th>
              <th scope="col" className="px-6 py-4">
                Fecha de alta
              </th>
              <th scope="col" className="px-6 py-4">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <TableClients
              isLoading={isLoading}
              isError={isError}
              clientes={clientes || []}
            />
          </tbody>
        </table>
      </div>
    </CardContent>
  );
};
