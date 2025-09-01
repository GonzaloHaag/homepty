import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search } from "@/components/ui/search";
import { PlusCircleIcon } from "lucide-react";
import { Suspense } from "react";

export default function CrmClientsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de clientes</CardTitle>
        <CardDescription>
          Aquí podras ver y administrar todos tus clientes
        </CardDescription>
        <CardAction>
          <Button type="button" title="nuevo cliente">
            <PlusCircleIcon /> Nuevo cliente
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="filtro_titulo">Filtrar por nombre</Label>
            <Suspense>
              <Search placeholder="Buscar por nombre de cliente" />
            </Suspense>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Teléfono
                </th>
                <th scope="col" className="px-6 py-3">
                  DNI/CIF
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha de alta
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
