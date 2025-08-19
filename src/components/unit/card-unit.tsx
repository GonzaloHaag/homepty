import { UnitEntity } from "@/entities/unit";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { BathIcon, BedIcon, MapPinIcon } from "lucide-react";
import { formatMoney } from "@/utils/format-money";

interface CardUnitProps {
  unit: UnitEntity;
}
export const CardUnit = ({ unit }: CardUnitProps) => {
  const imageUrl = unit.unidades_imagenes ? unit.unidades_imagenes[0].image_url : "/images/placeholder.svg";
  return (
    <Card className="group relative overflow-hidden">
      <Link
        href={`/unit/${unit.id}`}
        className="block"
      >
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={unit.nombre_unidad}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute right-2 top-2 flex gap-2">
            
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1">{unit.nombre_unidad}</h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
            <MapPinIcon className="w-4 h-4" />
            <span>{unit.estados?.nombre_estado}, {unit.ciudades?.nombre_ciudad}</span>
          </div>
          <p className="font-bold text-lg mb-3">
            { formatMoney(unit.precio_unidad.toString()) }
          </p>
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <BedIcon className="w-4 h-4" />
                <span>{unit.banios_unidad ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <BathIcon className="w-4 h-4" />
                <span>{unit.habitaciones_unidad ?? 0}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-end gap-1">
                <span>
                  Total: { unit.area_unidad } m²
                </span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <span>
                  {unit.area_unidad}  m²
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
