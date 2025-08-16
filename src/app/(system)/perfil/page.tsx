import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { ButtonsHeaderProfile, SkeletonUserInfo, UserInfo } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <>
      <Header title="Perfil">
        <ButtonsHeaderProfile />
      </Header>
      <Container>
        <div className="flex flex-col gap-y-4">
          <div className="w-full min-h-40 bg-red-600 rounded-md p-4">
            <Button type="button" title="cambiar banner" variant={"outline"}>
              <CameraIcon /> Cambiar banner
            </Button>
          </div>
          <Suspense fallback={<SkeletonUserInfo />}>
            <UserInfo />
          </Suspense>
          <hr />
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">Mis propiedades</h4>
            <Button type="button" title="Filtrar por tipo">
              Todos los tipos
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
