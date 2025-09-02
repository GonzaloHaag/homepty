import { DialogClient } from "@/components/crm";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageClient } from "./page-client";

export default function CrmClientsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de clientes</CardTitle>
        <CardDescription>
          Aquí podras ver y administrar todos tus clientes
        </CardDescription>
        <CardAction>
          <DialogClient />
        </CardAction>
      </CardHeader>
      <PageClient />
    </Card>
  );
}
