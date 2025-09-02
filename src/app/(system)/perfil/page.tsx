import Image from "next/image";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import {
  ButtonsHeaderProfile,
  FilterPropertiesContainer,
  UserInfo,
} from "@/components/profile";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import { verifySession } from "@/lib/dal";
export default async function ProfilePage() {

  const session = await verifySession();
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
            <UserInfo userId={session.userId} />
          <hr />
          <FilterPropertiesContainer userId={session.userId} />
        </div>
      </Container>
    </>
  );
}
