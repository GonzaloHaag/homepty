"use client";
import { use } from "react";
import { PropertyEntity } from "@/entities/property";
import { ErrorMessage } from "../error";
import { CardProperty } from "./card-property";

interface PropertiesContainerProps {
   properties:Promise<{
    ok: boolean;
    message: string;
    data?: {
      propiedades: PropertyEntity[];
    }}>
}
export const PropertiesContainer = ({ properties }: PropertiesContainerProps) => {
  const responseProperties = use(properties);
  if(!responseProperties.ok || !responseProperties.data) {
    return <ErrorMessage message="Error al cargar las propiedades" />;
  }
  const { propiedades } = responseProperties.data;
  return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {propiedades.map((property) => (
            <CardProperty key={property.id_propiedad} property={ property } />
          ))}
      </section>
  );
};
