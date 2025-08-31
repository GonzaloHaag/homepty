"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BathIcon,
  BedIcon,
  HeartIcon,
  LoaderCircleIcon,
  MapPinIcon,
  SquareIcon,
} from "lucide-react";
import { formatMoney } from "@/utils/format-money";
import { Button } from "../ui/button";
import { PropertyEntity } from "@/entities/property";
import { toggleSavedPropertyAction } from "@/server/actions/property";
import { toast } from "sonner";

interface CardUnitProps {
  unit: PropertyEntity & { is_saved: boolean };
}
export const CardUnit = ({ unit }: CardUnitProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(unit.is_saved);
  const [isPending, startTransition] = useTransition();
  const handleToggleFavoriteClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      const response = await toggleSavedPropertyAction({ propertyId: id });
      if (!response.ok) {
        toast.error(response.message);
        return;
      }
      setIsSaved((prevState) => !prevState);
      toast.success(response.message);
    });
  };

  console.log(isSaved);
  const imageUrl =
    unit.propiedades_imagenes?.[0]?.image_url || "/images/placeholder.svg";
  return (
    <Link href={`/unit/${unit.id_propiedad}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 relative group min-h-[380px]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={unit.titulo_propiedad}
            className="w-full h-full object-cover aspect-square"
            fill
          />
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm">
            <span className="text-sm font-semibold text-gray-900">
              {formatMoney(
                unit.precio_propiedad ? unit.precio_propiedad.toString() : "0"
              )}
            </span>
          </div>

          <Button
            size={"icon"}
            variant={"outline"}
            onClick={(e) => handleToggleFavoriteClick(e, unit.id_propiedad)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm transition-all duration-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 hover:bg-gray-50"
          >
            {isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <HeartIcon
                className={`w-4 h-4 transition-colors ${
                  isSaved ? "fill-red-600 text-red-600" : "text-gray-600"
                }`}
              />
            )}
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base mb-2 truncate">
            {unit.titulo_propiedad}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPinIcon size={16} className="mr-1" />
            <span className="text-sm truncate">{`${unit.estados?.nombre_estado}, ${unit.ciudades?.nombre_ciudad}`}</span>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <BedIcon size={16} className="mr-2" />
              <span className="text-sm">
                {unit.habitaciones_propiedad ?? 0} hab.
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <BathIcon size={16} className="mr-2" />
              <span className="text-sm">
                {unit.banios_propiedad ?? 0} baños
              </span>
            </div>
          </div>

          {/* Areas */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
            <div className="flex items-center text-gray-600">
              <SquareIcon size={16} className="mr-2" />
              <div className="text-xs">
                <div className="font-medium">
                  {unit.area_construida_propiedad ?? 0} m²
                </div>
                <div className="text-gray-500">Construida</div>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <SquareIcon size={16} className="mr-2" />
              <div className="text-xs">
                <div className="font-medium">{unit.area_propiedad ?? 0} m²</div>
                <div className="text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
