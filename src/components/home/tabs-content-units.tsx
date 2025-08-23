import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { TabsContent } from "../ui/tabs";
import { ErrorMessage } from "../error";
import { CardUnit } from "../unit";
import { getUnits } from "@/services";
export const TabsContentUnits = async () => {
  const response = await getUnits({ byUserId:false, search:"" });
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
