"use client";
import { PropertyEntity } from "@/entities/property";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { TabsContent } from "../ui/tabs";
import { use } from "react";
import { ErrorMessage } from "../error";
import { CardProperty } from "../property";
interface TabsContentPropertiesProps {
  properties: Promise<{
    ok: boolean;
    message: string;
    data?: { propiedades: PropertyEntity[] };
  }>;
}
export const TabsContentProperties = ({
  properties,
}: TabsContentPropertiesProps) => {
  const response = use(properties);
  if (!response.ok || !response.data) {
    return <ErrorMessage message={response.message} />;
  }
  const { propiedades } = response.data;
  return (
    <TabsContent value="propiedades">
      {propiedades.length > 0 ? (
        <Carousel>
          <CarouselContent>
             {
              propiedades.map((propiedad) => (
                 <CarouselItem key={propiedad.id_propiedad} className="basis-1/3">
                    <CardProperty property={ propiedad } />
                 </CarouselItem>
              ))
             }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <span className="text-lg">Aún no se agregaron propiedades</span>
      )}
    </TabsContent>
  );
};
