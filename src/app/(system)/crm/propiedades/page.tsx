import { Search } from "@/components/ui/search";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TableProperties } from "@/components/crm/properties/table-properties";

export default function CrmPropertiesPage() {
  return (
    <Card>
        <CardHeader>
          <CardTitle>
            Gestión de propiedades
          </CardTitle>
          <CardDescription>
            Aquí podras ver y administrar todas tus propiedades
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
            <div className="grid grid-cols-2 items-start gap-6">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="filtro_titulo">Filtrar por título *</Label>
                <Search placeholder="Buscar por titulo de la propiedad" />
              </div>
            </div>
            <TableProperties />
        </CardContent>
    </Card>
  );
}