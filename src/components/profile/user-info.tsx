"use client";
import { getUser } from "@/server/services";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { DialogEditProfile } from "./dialog-edit-profile";
import { useQuery } from "@tanstack/react-query";
import { SkeletonUserInfo } from "./skeleton-user-info";
import { ErrorMessage } from "../error";
import { UserEntity } from "@/entities/user";
export const UserInfo = () => {
  const fetchUser = async () => {
    const response = await getUser();
    if (!response.ok || !response.user) {
      throw new Error("Error al obtener el usuario");
    }
    return response.user;
  };
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserEntity>({
    queryKey: ["user_info"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
  });
  if (isLoading) {
    return <SkeletonUserInfo />;
  }
  if (isError || !user) {
    return <ErrorMessage message="Error al obtener los datos del usuario" />;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <h3 className="font-bold text-lg">{user.nombre_usuario}</h3>
          <p className="text-sm text-muted-foreground">
            {user.descripcion_usuario}
          </p>
        </div>
        <DialogEditProfile user={user} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-x-2">
          <MapPinIcon size={20} />
          <span>{`${user.estados?.nombre_estado} - ${user.ciudades?.nombre_ciudad}`}</span>
          <span className="text-muted-foreground text-sm">Ubicación</span>
        </div>
        <div className="flex items-center gap-x-2">
          <PhoneIcon size={20} />
          <span>{user.telefono_usuario}</span>
          <span className="text-muted-foreground text-sm">Teléfono</span>
        </div>
        <div className="flex items-center gap-x-2">
          <MailIcon size={20} />
          <span>{user.email_usuario}</span>
          <span className="text-muted-foreground text-sm">
            Correo electrónico
          </span>
        </div>
      </div>
    </div>
  );
};
