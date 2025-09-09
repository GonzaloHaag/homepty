import { Header } from "@/components/header";
import { DialogRequest } from "@/components/requests";

export default function RequestsPage() {
  return (
     <>
       <Header title="Solicitudes de inmuebles">
           <DialogRequest />
       </Header>
     </>
  );
}