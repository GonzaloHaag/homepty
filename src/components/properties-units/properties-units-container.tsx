import { PropertyEntity } from "@/entities/property";
import { UnitEntity } from "@/entities/unit";
import { ErrorMessage } from "../error";
import { CardProperty } from "../property/card-property";
import { CardUnit } from "../unit/card-unit";

interface CombinedContainerProps {
  properties: Promise<{
    ok: boolean;
    message: string;
    data?: { propiedades: PropertyEntity[] };
  }>;
  units: Promise<{
    ok: boolean;
    message: string;
    data?: { unidades: UnitEntity[] };
  }>;
}

export const PropertiesUnitsContainer = async ({
  properties,
  units,
}: CombinedContainerProps) => {
  const responseProperties = await properties;
  const responseUnits = await units;

  if (!responseProperties.ok || !responseUnits.ok) {
    return <ErrorMessage message="Error al cargar propiedades/unidades" />;
  }

  const propiedades = responseProperties.data?.propiedades ?? [];
  const unidades = responseUnits.data?.unidades ?? [];

  // 🎯 Combinar en un solo array, con un campo `type` para diferenciarlos
  const items = [
    ...propiedades.map((p) => ({ ...p, type: "property" as const })),
    ...unidades.map((u) => ({ ...u, type: "unit" as const })),
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.length > 0 ? (
        items.map((item) =>
          item.type === "property" ? (
            <CardProperty
              key={`property-${item.id_propiedad}`}
              property={item}
            />
          ) : (
            <CardUnit key={`unit-${item.id}`} unit={item} />
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
