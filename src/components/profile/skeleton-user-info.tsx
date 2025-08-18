import { Skeleton } from "../ui/skeleton";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

export const SkeletonUserInfo = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex flex-col gap-1">
        <Skeleton className="w-[180px] h-6 rounded-md" /> {/* Nombre */}
        <Skeleton className="w-[250px] h-6 rounded-md" /> {/* Descripción */}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-x-2">
          <MapPinIcon size={20} />
          <Skeleton className="w-[120px] h-4 rounded-md" /> {/* Ubicación */}
        </div>
        <div className="flex items-center gap-x-2">
          <PhoneIcon size={20} />
          <Skeleton className="w-[100px] h-4 rounded-md" /> {/* Teléfono */}
        </div>
        <div className="flex items-center gap-x-2">
          <MailIcon size={20} />
          <Skeleton className="w-[200px] h-4 rounded-md" /> {/* Email */}
        </div>
      </div>
    </div>
  );
};
