import { Search } from "@/components/ui/search";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TableProperties } from "@/components/crm/properties/table-properties";
import { Suspense } from "react";
import { verifySession } from "@/lib/dal";

export default async function CrmPropertiesPage(props: {
  searchParams?: Promise<{
    search?:string;
  }>;
}) {
  const session = await verifySession();
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.search || "";
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de propiedades</CardTitle>
        <CardDescription>
          Aquí podras ver y administrar todas tus propiedades
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
                <th scope="col" className="px-6 py-4">
                  Titulo de la propiedad
                </th>
                <th scope="col" className="px-6 py-4">
                  Tipo de propiedad
                </th>
                <th scope="col" className="px-6 py-4">
                  Dirección
                </th>
                <th scope="col" className="px-6 py-4">
                  Localidad
                </th>
                <th scope="col" className="px-6 py-4">
                  Estado
                </th>
                <th scope="col" className="px-6 py-4">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <Suspense
              key={searchQuery}
                fallback={
                  <tr>
                    <td
                      colSpan={6}
                      className="w-full text-center text-muted-foreground py-4"
                    >
                      Cargando propiedades...
                    </td>
                  </tr>
                }
              >
                <TableProperties userId={session.userId} search={searchQuery} />
              </Suspense>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
