import { PropertyEntity } from "@/entities/property";
import { formatMoney } from "@/utils/format-money";
import {
  BathIcon,
  BedIcon,
  CarIcon,
  HomeIcon,
  MapPinIcon,
  MaximizeIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Badge } from "../ui/badge";

interface PropertyDetailsProps {
  property: PropertyEntity;
}
export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const images = property.propiedades_imagenes ?? [];
  const fullStars = Math.floor(4);
  const hasHalfStar = 4 % 1 !== 0;
  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-y-6 col-span-2">
        <div className="grid grid-cols-3 gap-6">
          {images.length > 0 ? (
            images.map((property_image) => (
              <div
                key={property_image.id}
                className="w-full min-h-60 relative rounded-md shadow-md"
              >
                <Image
                  src={property_image.image_url || "/images/placeholder.svg"}
                  alt={`Imagen de propiedad ${property_image.id}`}
                  fill
                  className="object-cover aspect-square rounded-md"
                />
              </div>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No hay imágenes de la propiedad !
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {property.titulo_propiedad}
          </h2>
          <span className="text-xl text-primary font-semibold">
            {formatMoney(
              property.precio_propiedad
                ? property.precio_propiedad.toString()
                : "0"
            )}{" "}
            MXN
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <MapPinIcon />
          <span>{`${property.estados?.nombre_estado} - ${property.ciudades?.nombre_ciudad}`}</span>
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
            <HomeIcon className="text-primary" />
            <span>
              {property.unidades_propiedades?.length ?? 0}{" "}
              {property.unidades_propiedades?.length === 1
                ? "Unidad"
                : "Unidades"}{" "}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <MaximizeIcon className="text-primary" />
            <span>{property.area_propiedad ?? 0} M²</span>
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold text-lg">Unidades asociadas</h4>
          <div className="grid grid-cols-3 gap-6">
            {property.unidades_propiedades &&
              property.unidades_propiedades.map((unit) => (
                <Card key={unit.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={"/images/placeholder.svg"}
                      alt={`Imagen de ${unit.nombre_unidad}`}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      className="absolute top-3 left-3 text-xs font-medium "
                    >
                      {unit.tipo_unidad}
                    </Badge>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold text-base text-card-foreground line-clamp-2">
                      {unit.nombre_unidad}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <BedIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {unit.habitaciones_unidad ?? 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <BathIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {unit.banios_unidad ?? 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <CarIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {unit.estacionamientos_unidad ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold text-lg">Descripción de la propiedad</h4>
          <p className="text-balance text-sm text-muted-foreground">
            {property.descripcion_propiedad
              ? property.descripcion_propiedad
              : "No se agrego ninguna descripción"}
          </p>
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="font-semibold text-lg">Amenidades</h4>
          <div className="grid grid-cols-4 gap-6">
            {property.amenidades && property.amenidades.length > 0 ? (
              property.amenidades.map((property_amenidad) => (
                <div
                  key={property_amenidad}
                  className="flex items-center"
                ></div>
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
            <Link
              href={"/reviews"}
              title="Reseñas"
              className={buttonVariants({ variant: "outline" })}
            >
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
