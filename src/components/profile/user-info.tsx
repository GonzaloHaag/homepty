import { getUser } from "@/actions/user";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

export const UserInfo = async () => {
  const response = await getUser();
  if (!response.ok || !response.user) {
    console.error(response.message);
    return;
  }

  const user = response.user;
  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0">
            <h3 className="font-bold text-lg">{user.nombre_usuario}</h3>
            <p className="text-sm text-muted-foreground">{user.descripcion_usuario}</p>
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-2">
                <MapPinIcon size={20} />
                <span>{"Ciudad de mexico"}</span>
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
                <span className="text-muted-foreground text-sm">Correo electrónico</span>
            </div>
        </div>
    </div>
  );
};
