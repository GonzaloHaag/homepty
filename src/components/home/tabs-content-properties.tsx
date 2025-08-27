import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { TabsContent } from "../ui/tabs";
import { ErrorMessage } from "../error";
import { CardProperty } from "../property";
import { getProperties } from "@/server/services";
export const TabsContentProperties = async () => {
  const response = await getProperties({ byUserId:false, search:"" });
  if (!response.ok || !response.data) {
    return <ErrorMessage message={response.message} />;
  }
  const { propiedades } = response.data;

  console.log(propiedades);
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
