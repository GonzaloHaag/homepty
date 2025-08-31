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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
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
            <Tabs defaultValue="propiedades" className="w-[95%] mb-1">
              <TabsList className="w-[400px]">
                <TabsTrigger value="propiedades" className="cursor-pointer">
                  Propiedades
                </TabsTrigger>
                <TabsTrigger value="unidades" className="cursor-pointer">
                  Unidades
                </TabsTrigger>
              </TabsList>
              <TabsContent value="propiedades">
                <Suspense fallback={<div className="text-muted-foreground">Cargando...</div>}>
                  <TabsContentProperties />
                </Suspense>
              </TabsContent>
              <TabsContent value="unidades">
                <Suspense fallback={<div className="text-muted-foreground">Cargando...</div>}>
                  <TabsContentUnits />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex flex-col gap-y-2">
            <h4 className="font-semibold text-xl">
              Todas las propiedades y unidades
            </h4>
            <SectionFilteringPropertiesAndUnits />
          </div>
        </section>
      </Container>
    </>
  );
}
