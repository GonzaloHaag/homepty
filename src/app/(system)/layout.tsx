"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <QueryClientProvider client={ queryClient }>
        <AppSidebar />
        <SidebarInset>
          {children}
          <Toaster position="top-right" richColors duration={2000} />
        </SidebarInset>
      </QueryClientProvider>
    </SidebarProvider>
  );
}
