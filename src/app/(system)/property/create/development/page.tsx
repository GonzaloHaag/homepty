import Link from "next/link";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { FormPropertyDevelopment } from "@/components/property";
import { buttonVariants } from "@/components/ui/button";

export default function PropertyCreateDevelopmentPage() {
  return (
    <>
      <Header title="Crear propiedad - Desarrollo">
        <Link
          href={"/perfil"}
          title="Cancelar"
          className={buttonVariants({ variant: "outline" })}
        >
          Cancelar
        </Link>
      </Header>
      <Container>
          <FormPropertyDevelopment />
      </Container>
    </>
  );
}
