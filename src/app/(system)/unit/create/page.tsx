import Link from "next/link";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { FormUnit } from "@/components/unit";

export default function UnitCreatePage() {
  return (
    <>
      <Header title="Crear unidad">
        <Link
          href={"/perfil"}
          title="Cancelar"
          className={buttonVariants({ variant: "outline" })}
        >
          Cancelar
        </Link>
      </Header>
      <Container>
        <FormUnit />
      </Container>
    </>
  );
}
