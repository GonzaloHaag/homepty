"use client";
import { PropertyEntity } from "@/entities/property";
import Link from "next/link";
import Image from "next/image";
import { BoxesIcon, HeartIcon, MapPinIcon, SquareIcon, WarehouseIcon } from "lucide-react";
import { formatMoney } from "@/utils/format-money";
import { Button } from "../ui/button";
import { UnitProperty } from "@/entities/unit_property";

interface CardPropertyProps {
  property: PropertyEntity & { unidades_propiedades?: UnitProperty[] };
}
export const CardProperty = ({ property }: CardPropertyProps) => {
  const imageUrl =
    property.propiedades_imagenes?.[0]?.image_url || "/images/placeholder.svg";
  const handleToggleFavoriteClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(id);
  };

  return (
    <Link href={`/property/development/${property.id_propiedad}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 relative group min-h-[380px]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={property.titulo_propiedad}
            className="w-full h-full object-cover aspect-square"
            fill
          />
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm">
            <span className="text-sm font-semibold text-gray-900">
              {formatMoney(
                property.precio_propiedad ? property.precio_propiedad.toString() : "0"
              )}
            </span>
          </div>

          <Button
            size={"icon"}
            variant={"outline"}
            onClick={(e) => handleToggleFavoriteClick(e, property.id_propiedad)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm transition-all duration-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 hover:bg-gray-50"
          >
            <HeartIcon size={16} className="transition-colors" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base mb-2 truncate">
            {property.titulo_propiedad}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPinIcon size={16} className="mr-1" />
            <span className="text-sm truncate">{`${property.estados?.nombre_estado}, ${property.ciudades?.nombre_ciudad}`}</span>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <BoxesIcon size={16} className="mr-2" />
              <span className="text-sm">
                {property.unidades_propiedades?.length ?? 0} {property.unidades_propiedades?.length === 1 ? "unidad" : "unidades"}
              </span>
            </div>
            <div className="flex items-center justify-end text-gray-700">
              <WarehouseIcon size={16} className="mr-2" />
              <span className="text-sm truncate">
                {property.tipo_propiedad}
              </span>
            </div>
          </div>

          {/* Areas */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
            <div className="flex items-center text-gray-600">
              <SquareIcon size={16} className="mr-2" />
              <div className="text-xs">
                <div className="font-medium">
                  {property.area_construida_propiedad ?? 0} m²
                </div>
                <div className="text-gray-500">Construida</div>
              </div>
            </div>
            <div className="flex items-center justify-end text-gray-600">
              <SquareIcon size={16} className="mr-2" />
              <div className="text-xs">
                <div className="font-medium">{property.area_propiedad ?? 0} m²</div>
                <div className="text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
