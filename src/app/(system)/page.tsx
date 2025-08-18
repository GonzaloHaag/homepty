import { getProperties } from "@/actions/property";
import { getUnits } from "@/actions/unit";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { FilterRangePrice } from "@/components/home";
import { PropertiesContainer } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TYPE_OPERATIONS, TYPES_UNITS } from "@/utils/consts";
import { FunnelIcon, SearchIcon } from "lucide-react";
import { Suspense } from "react";

export default function HomePage() {
  const properties = getProperties({ byUserId: false });
  const units = getUnits({ byUserId: false });
  return (
    <>
      <Header title="Encuentra las mejores propiedades" />
      <Container>
        <section className="w-full flex flex-col gap-y-4">
          <div className="grid grid-cols-3 gap-6">
            <Suspense>
              <Search placeholder="Buscar por nombre, estado o ciudad..." />
            </Suspense>
            <Select defaultValue="todas">
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
            <Select defaultValue="todos">
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
          </div>
          <div className="w-full max-w-max flex items-center gap-6">
            <FilterRangePrice />
            <Button type="button" variant={"outline"} title="más filtros">
              <FunnelIcon /> Más filtros
            </Button>
            <Button type="button" title="Buscar" className="min-w-32">
              <SearchIcon /> Buscar
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <h4 className="font-semibold text-lg">Todas las propiedades</h4>
            <PropertiesContainer properties={properties} units={units} />
          </div>
        </section>
      </Container>
    </>
  );
}
