import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { PropertyDetails } from "@/components/property";
import { ButtonBack } from "@/components/unit";
import { getPropertyById } from "@/server/services";

export default async function PropertyByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getPropertyById({ propertyId: Number(id) });
  if (!response.ok || !response.data) {
    return <span className="my-6 text-red-600 px-4">Error al obtener la propiedad</span>;
  }
  const { propiedad } = response.data;
  return (
    <>
      <Header title={`Detalles de la propiedad ${Number(id)}`}>
        <ButtonBack />
      </Header>
      <Container>
        <PropertyDetails property={ propiedad } />
      </Container>
    </>
  );
}
