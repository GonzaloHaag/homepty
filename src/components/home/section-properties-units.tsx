import { CombinedItem } from "@/actions/properties-units";
import { CardProperty } from "../property";
import { CardUnit } from "../unit";
import { ErrorMessage } from "../error";

interface SectionPropertiesUnitsProps {
  isFetching: boolean;
  isError: boolean;
  propertiesAndUnits: CombinedItem[] | null;
}
export const SectionPropertiesUnits = ({
  isFetching,
  isError,
  propertiesAndUnits,
}: SectionPropertiesUnitsProps) => {
  if (isFetching) {
    return (
      <span className="text-muted-foreground text-sm">Cargando datos...</span>
    );
  }
  if (isError) {
    return <ErrorMessage message={"Error al cargar los datos"} />;
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {propertiesAndUnits!.length > 0 ? (
        propertiesAndUnits!.map((item) =>
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
