import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { ButtonBack, UnitDetails } from "@/components/unit";
import { getUnitById } from "@/server/services";

export default async function UnitByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getUnitById(Number(id));
  if (!response.ok || !response.unit) {
    return <span className="my-6 text-red-600 px-4">Error al obtener la unidad</span>;
  }
  const { unit } = response;
  return (
    <>
      <Header title={`Detalles de la unidad ${Number(id)}`}>
        <ButtonBack />
      </Header>
      <Container>
        <UnitDetails unit={unit} />
      </Container>
    </>
  );
}
