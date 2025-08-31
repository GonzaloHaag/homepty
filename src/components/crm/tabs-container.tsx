"use client";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";

export const TabsContainer = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const activeTab = segments.length > 1 ? segments[1] : "crm";
  const tabs = [
    { value: "crm", label: "CRM", href: "/crm" },
    { value: "propiedades", label: "Propiedades", href: "/crm/propiedades" },
    { value: "clientes", label: "Clientes", href: "/crm/clientes" },
    { value: "calendario", label: "Calendario", href: "/crm/calendario" },
  ];
  return (
    <Tabs className="w-full" value={activeTab}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} asChild>
            <Link href={tab.href} title={tab.label}>
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
