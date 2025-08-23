import { formatMoney } from "@/utils/format-money";
import {
  BathIcon,
  BedIcon,
  MapPinIcon,
  MaximizeIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { UnitEntity } from "@/entities/unit";

interface UnitDetailsProps {
  unit:UnitEntity;
}
export const UnitDetails = async ({ unit }: UnitDetailsProps) => {
  const images = unit.unidades_imagenes ?? [];
  const fullStars = Math.floor(4);
  const hasHalfStar = 4 % 1 !== 0;
  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-y-6 col-span-2">
        <div className="grid grid-cols-3 gap-6">
          {images.length > 0 ? (
            images.map((unidad_image) => (
              <div
                key={unidad_image.id}
                className="w-full min-h-60 relative rounded-md shadow-md"
              >
                <Image
                  src={unidad_image.image_url || "/images/placeholder.svg"}
                  alt={`Imagen de unidad ${unidad_image.id}`}
                  fill
                  className="object-cover aspect-square rounded-md"
                />
              </div>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No hay imágenes de la unidad !
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{unit.nombre_unidad}</h2>
          <span className="text-xl text-primary font-semibold">
            {formatMoney(unit.precio_unidad.toString())} MXN
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <MapPinIcon />
          <span>{`${unit.estados?.nombre_estado} - ${unit.ciudades?.nombre_ciudad}`}</span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-6 h-6 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-6 h-6 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-6 h-6 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-6 h-6 ms-1 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-2">
            <BedIcon className="text-primary" />
            <span>{unit.habitaciones_unidad ?? 0} Habitaciones </span>
          </div>
          <div className="flex items-center gap-x-2">
            <BathIcon className="text-primary" />
            <span>{unit.banios_unidad ?? 0} Baños</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MaximizeIcon className="text-primary" />
            <span>{unit.area_unidad ?? 0} M²</span>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold text-lg">Descripción de la unidad</h4>
          <p className="text-balance text-sm text-muted-foreground">
            {unit.descripcion_unidad
              ? unit.descripcion_unidad
              : "No se agrego ninguna descripción"}
          </p>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold text-lg">Amenidades</h4>
          <div className="grid grid-cols-4 gap-6">
            {unit.amenidades && unit.amenidades.length > 0 ? (
              unit.amenidades.map((unit_amenidad) => (
                <div key={unit_amenidad} className="flex items-center"></div>
              ))
            ) : (
              <span className="col-span-4 text-sm text-muted-foreground">
                {" "}
                No se agregaron amenidades{" "}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-0">
              <h4 className="font-semibold text-lg">Reviews</h4>
              <span className="text-muted-foreground">
                8 reseñas de expertos
              </span>
            </div>
            <Link href={"/reviews"} title="Reseñas" className={buttonVariants({ variant:"outline" })}>
                Ver todas las reseñas
            </Link>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto">
            <Card className="w-full sm:max-w-sm">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      MD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">Maria gonzalez</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < fullStars
                                ? "fill-yellow-400 text-yellow-400"
                                : i === fullStars && hasHalfStar
                                ? "fill-yellow-400/50 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {4}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="">
                <p className="text-sm text-muted-foreground leading-relaxed truncate">
                  La ubicación es ideal si planeas mudarte con tu familia, tiene
                  excelente
                </p>
              </CardContent>
            </Card>
            <Card className="w-full sm:max-w-sm">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      MD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">Maria gonzalez</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < fullStars
                                ? "fill-yellow-400 text-yellow-400"
                                : i === fullStars && hasHalfStar
                                ? "fill-yellow-400/50 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {4}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="">
                <p className="text-sm text-muted-foreground leading-relaxed truncate">
                  La ubicación es ideal si planeas mudarte con tu familia, tiene
                  excelente
                </p>
              </CardContent>
            </Card>
            <Card className="w-full sm:max-w-sm">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      MD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">Maria gonzalez</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < fullStars
                                ? "fill-yellow-400 text-yellow-400"
                                : i === fullStars && hasHalfStar
                                ? "fill-yellow-400/50 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {4}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="">
                <p className="text-sm text-muted-foreground leading-relaxed truncate">
                  La ubicación es ideal si planeas mudarte con tu familia, tiene
                  excelente
                </p>
              </CardContent>
            </Card>
            <Card className="w-full sm:max-w-sm">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      MD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">Maria gonzalez</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < fullStars
                                ? "fill-yellow-400 text-yellow-400"
                                : i === fullStars && hasHalfStar
                                ? "fill-yellow-400/50 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {4}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="">
                <p className="text-sm text-muted-foreground leading-relaxed truncate">
                  La ubicación es ideal si planeas mudarte con tu familia, tiene
                  excelente
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
