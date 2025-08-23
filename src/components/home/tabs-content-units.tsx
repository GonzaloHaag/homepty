"use client";
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
import { UnitEntity } from "@/entities/unit";
import { CardUnit } from "../unit";
interface TabsContentPropertiesProps {
  units: Promise<{
    ok: boolean;
    message: string;
    data?: { unidades: UnitEntity[] };
  }>;
}
export const TabsContentUnits = ({
  units
}: TabsContentPropertiesProps) => {
  const response = use(units);
  if (!response.ok || !response.data) {
    return <ErrorMessage message={response.message} />;
  }
  const { unidades } = response.data;
  return (
    <TabsContent value="unidades">
      {unidades.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {unidades.map((unidad) => (
              <CarouselItem key={unidad.id} className="basis-1/4">
                <CardUnit unit={ unidad } />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <span className="text-lg">Aún no se agregaron unidades</span>
      )}
    </TabsContent>
  );
};
