"use client";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { TabsContainer } from "@/components/crm";
import { Header } from "@/components/header";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Función para capitalizar cada segmento
  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // Dividimos la ruta en segmentos y capitalizamos
  const segments = pathname.split("/").filter(Boolean).map(capitalize);

  // Armamos el título dinámico
  const title = segments.join(" - ") || "CRM";
  return (
    <>
      <Header title={ title } />
      <Container>
         <section className="flex flex-col gap-y-6">
            <TabsContainer />
            { children }
         </section>
      </Container>
    </>
  );
}
