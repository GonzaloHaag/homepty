import { Search } from "@/components/ui/search";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Suspense } from "react";
import { TableUnits } from "@/components/crm/units/table-units";

export default function CrmUnitsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de unidades</CardTitle>
        <CardDescription>
          Aquí podras ver y administrar todas tus unidades
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="filtro_titulo">Filtrar por título *</Label>
            <Suspense>
              <Search placeholder="Buscar por titulo de la propiedad" />
            </Suspense>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Titulo de la unidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipo de unidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Dirección
                </th>
                <th scope="col" className="px-6 py-3">
                  Localidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <tr>
                    <td
                      colSpan={7}
                      className="w-full text-center text-muted-foreground py-3"
                    >
                      Cargando unidades...
                    </td>
                  </tr>
                }
              >
                <TableUnits />
              </Suspense>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
