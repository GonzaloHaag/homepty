import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { HandshakeIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { FormOffer } from "./form-offer";
import { OffersContainer } from "./offers-container";
export const DialogOffers = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          title="estimar valor"
          size={"lg"}
          variant={"outline"}
        >
          <HandshakeIcon className="text-green-600" /> Ofertas inmobiliarias
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-3xl max-h-[95dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <HandshakeIcon className="text-green-600" /> Ofertas inmobiliarias
          </DialogTitle>
          <DialogDescription>
            Crea, gestiona o analiza ofertas de compra y alquiler. Conéctate con
            otros usuarios.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="crear_oferta" className="w-full">
          <TabsList>
            <TabsTrigger value="crear_oferta" className="cursor-pointer">Crear oferta</TabsTrigger>
            <TabsTrigger value="mis_ofertas" className="cursor-pointer">Mis ofertas</TabsTrigger>
          </TabsList>
          <TabsContent value="crear_oferta">
            <FormOffer />
          </TabsContent>
          <TabsContent value="mis_ofertas">
             <OffersContainer />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
