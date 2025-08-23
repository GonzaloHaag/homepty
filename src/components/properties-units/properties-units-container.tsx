import { CombinedItem } from "@/types/combined-item";
import { ErrorMessage } from "../error";
import { CardProperty } from "../property/card-property";
import { CardUnit } from "../unit/card-unit";

interface CombinedContainerProps {
  propertiesAndUnits: Promise<{ ok:boolean, message:string, data: CombinedItem[] | null}>
}

export const PropertiesUnitsContainer = async ({
  propertiesAndUnits
}: CombinedContainerProps) => {
  const response = await propertiesAndUnits;

  if (!response.ok || !response.data) {
    return <ErrorMessage message="Error al cargar propiedades/unidades" />;
  }

  const items = response.data;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.length > 0 ? (
        items.map((item) =>
          item.type === "property" ? (
            <CardProperty
              key={`property-${item.data.id_propiedad}`}
              property={item.data}
            />
          ) : (
            <CardUnit key={`unit-${item.data.id}`} unit={item.data} />
          )
        )
      ) : (
        <span className="text-sm text-muted-foreground">
          No se encontraron resultados
        </span>
      )}
    </section>
  );
};
