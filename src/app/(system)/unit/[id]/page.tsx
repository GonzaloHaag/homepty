import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { ButtonBack, UnitDetails } from "@/components/unit";

export default async function UnitByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Header title={`Detalles de la unidad ${Number(id)}`}>
         <ButtonBack />
      </Header>
      <Container>
          <UnitDetails id={ Number(id) } />
      </Container>
    </>
  );
}
