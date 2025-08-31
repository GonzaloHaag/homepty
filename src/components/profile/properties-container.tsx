import { PropertyEntity } from "@/entities/property";
import { CardProperty } from "../property";
import { ErrorMessage } from "../error";
import { CardUnit } from "../unit";

interface PropertiesContainerProps {
  isLoading: boolean;
  isError: boolean;
  properties: PropertyEntity[];
  ids_propiedades_guardadas: number[]
}
export const PropertiesContainer = ({
  isLoading,
  isError,
  properties,
  ids_propiedades_guardadas
}: PropertiesContainerProps) => {
  if (isLoading) {
    return (
      <span className="text-muted-foreground text-sm">Cargando datos...</span>
    );
  }
  if (isError) {
    return <ErrorMessage message="Error al cargar los datos" />;
  }
  const savedIdsSet = new Set(ids_propiedades_guardadas || []);
  
  const propertiesWithSaved = properties.map((property) => ({
    ...property,
    is_saved: savedIdsSet.has(property.id_propiedad) // devuelve true si esta, false sino
  }));
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {propertiesWithSaved.length > 0 ? (
        propertiesWithSaved.map((property) => (
          property.is_unit ? <CardUnit key={property.id_propiedad} unit={ property } /> : <CardProperty key={property.id_propiedad} property={property} />
        ))
      ) : (
        <span className="text-muted-foreground text-sm">
          No se encontraron resultados
        </span>
      )}
    </section>
  );
};
