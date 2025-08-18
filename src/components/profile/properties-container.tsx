"use client";
import { use } from "react";
import { PropertyEntity } from "@/entities/property";
import { UnitEntity } from "@/entities/unit";
import { ErrorMessage } from "../error";

interface PropertiesContainerProps {
   properties:Promise<{
    ok: boolean;
    message: string;
    data?: {
      propiedades: PropertyEntity[];
    }}>
    units: Promise<{
      ok:boolean;
      message:string;
      data? : {
        unidades: UnitEntity[];
      }
    }>
}
export const PropertiesContainer = ({ properties, units }: PropertiesContainerProps) => {
  const responseProperties = use(properties);
  const responseUnits = use(units);
  if(!responseProperties.ok || !responseProperties.data) {
    return <ErrorMessage message="Error al cargar las propiedades" />;
  }
  if(!responseUnits.ok || !responseUnits.data) {
    return <ErrorMessage message="Error al cargar las unidades" />;
  }
  const { propiedades } = responseProperties.data;
  const { unidades } = responseUnits.data;
  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {propiedades.map((property) => (
            <div
              key={property.id_propiedad}
              className="bg-white p-4 rounded-md shadow"
            >
              <h5 className="font-semibold">{property.titulo_propiedad}</h5>
              <p>{property.descripcion_propiedad}</p>
              <p>
                Ubicación: {property.estados?.nombre_estado},{" "}
                {property.ciudades?.nombre_ciudad}
              </p>
            </div>
          ))}
      </section>
      <section>
        <h4 className="font-semibold text-lg mb-2">Unidades</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unidades.map((unit) => (
            <div key={unit.id} className="bg-white p-4 rounded-md shadow">
              <h5 className="font-semibold">{unit.nombre_unidad}</h5>
              <p>{unit.descripcion_unidad}</p>
              <p>Tipo: {unit.tipo_unidad}</p>
              <p>Precio: ${unit.precio_unidad}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
