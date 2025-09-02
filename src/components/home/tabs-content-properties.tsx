"use server";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ErrorMessage } from "../error";
import { CardProperty } from "../property";
import { PropertyEntity } from "@/entities/property";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const TabsContentProperties = async () => {
  const data = await fetch(`${BASE_URL}/api/properties`,{ 
    next:{ revalidate:3600 },
    credentials:"include"
  });
  if(!data.ok) {
    return <ErrorMessage message={"Error al obtener las propiedades"} />;
  }
  const response: { ok:boolean, message:string, data?:{ propiedades:PropertyEntity[] }} = await data.json();
  if(!response.ok || !response.data) {
    return <ErrorMessage message={"Error al obtener las propiedades"} />;
  }

  const { propiedades } = response.data;
  return (
    <>
      {propiedades.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {propiedades.map((propiedad) => (
              <CarouselItem key={propiedad.id_propiedad} className="basis-1/3">
                <CardProperty property={propiedad} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <span className="text-lg">Aún no se agregaron propiedades</span>
      )}
    </>
  );
};
