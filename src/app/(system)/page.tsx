import { Suspense } from "react";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import {
  DialogOffers,
  SectionFilteringPropertiesAndUnits,
  SheetProfitabilityAnalysis,
  TabsContentProperties,
  TabsContentUnits,
} from "@/components/home";
import { Button } from "@/components/ui/button";
import { ActivityIcon, DollarSignIcon } from "lucide-react";
import {
  PropertiesUnitsSkeleton,
} from "@/components/properties-units";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPropertiesAndUnits } from "@/actions/properties-units";

export default async function HomePage() {
  const response = await getPropertiesAndUnits({ byUserId:false, search: "" });
  if(!response.ok || !response.data) {
    console.error("Error al obtener data");
    return;
  }
  return (
    <>
      <Header title="Inicio" />
      <Container>
        <section className="w-full flex flex-col gap-y-4">
          <div className="grid grid-cols-4 gap-6">
            <SheetProfitabilityAnalysis />
            <Button type="button" title="estimar valor" size={"lg"}>
              <DollarSignIcon /> Estimador de valor
            </Button>
            <DialogOffers />
            <Button
              type="button"
              title="estimar valor"
              size={"lg"}
              variant={"outline"}
            >
              <ActivityIcon className="text-primary" /> Resumen de actividad
            </Button>
          </div>
          <div className="flex flex-col gap-y-2">
            <h4 className="font-semibold text-lg">
              Propiedades y unidades populares
            </h4>
            <Tabs defaultValue="propiedades" className="w-[95%] mb-6">
              <TabsList className="w-[400px]">
                <TabsTrigger value="propiedades" className="cursor-pointer">
                  Propiedades
                </TabsTrigger>
                <TabsTrigger value="unidades" className="cursor-pointer">
                  Unidades
                </TabsTrigger>
              </TabsList>
              <Suspense fallback={<PropertiesUnitsSkeleton />}>
               {/* <TabsContentProperties properties={properties} /> **/ }
              </Suspense>
              {/* <TabsContentUnits units={units} /> */}
            </Tabs>
          </div>
          <div className="flex flex-col gap-y-2">
            <h4 className="font-semibold text-xl">
              Todas las propiedades y unidades
            </h4>
            <SectionFilteringPropertiesAndUnits data={ response.data } />
          </div>
        </section>
      </Container>
    </>
  );
}
