"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusinessIcon,
  Building2Icon,
  CircleUserIcon,
  ClipboardList,
  LayoutGridIcon,
  MapIcon,
} from "lucide-react";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const navMainItems = [
  {
    title: "Inicio",
    url: "/",
    icon: LayoutGridIcon,
  },
  {
    title: "Explorar",
    url: "/explore",
    icon: MapIcon,
  },
  {
    title: "Solicitudes",
    url: "/solicitudes",
    icon: ClipboardList,
  },
  {
    title: "Actividades",
    url: "/actividades/historial",
    icon: Building2Icon,
  },
  {
    title: "CRM",
    url: "/crm",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Perfil",
    url: "/perfil",
    icon: CircleUserIcon,
  },
];

const navUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-lg text-primary font-bold"
            >
              <Link href={"/"} title="Homepty">
                Homepty
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={ navUser } />
      </SidebarFooter>
    </Sidebar>
  );
}
