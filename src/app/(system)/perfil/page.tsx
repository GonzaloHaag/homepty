import { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import {
  ButtonsHeaderProfile,
  FilterPropertiesContainer,
  SkeletonUserInfo,
  UserInfo,
} from "@/components/profile";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
export default function ProfilePage() {
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
          <FilterPropertiesContainer />
        </div>
      </Container>
    </>
  );
}
