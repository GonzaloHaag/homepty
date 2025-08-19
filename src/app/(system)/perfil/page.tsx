import { getProperties } from "@/actions/property";
import { getUnits } from "@/actions/unit";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import {
  ButtonsHeaderProfile,
  SkeletonUserInfo,
  UserInfo,
} from "@/components/profile";
import { PropertiesContainer } from "@/components/property";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnitsContainer } from "@/components/unit";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export default function ProfilePage() {
  const properties = getProperties({ byUserId: true });
  const units = getUnits({ byUserId: true });
  return (
    <>
      <Header title="Perfil">
        <ButtonsHeaderProfile />
      </Header>
      <Container>
        <div className="flex flex-col gap-y-4">
          <div className="w-full min-h-40 rounded-md p-4 relative">
            <Button
              type="button"
              title="cambiar banner"
              variant={"outline"}
              className="absolute top-4 left-4 z-10"
            >
              <CameraIcon /> Cambiar banner
            </Button>
            <Image
              src={"/images/placeholder.svg"}
              alt="placeholder banner"
              fill
              objectFit="cover"
              className="absolute inset-0 rounded-md z-0"
            />
          </div>
          <Suspense fallback={<SkeletonUserInfo />}>
            <UserInfo />
          </Suspense>
          <hr />
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">
                Mis propiedades y unidades
              </h4>
              <Select defaultValue="all">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="Casa">Casa</SelectItem>
                  <SelectItem value="Departamento">Departamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Suspense fallback={<div>Cargando propiedades...</div>}>
            <PropertiesContainer properties={properties} />
          </Suspense>
          <Suspense fallback={<div>Cargando unidades...</div>}>
            <UnitsContainer units={units} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
