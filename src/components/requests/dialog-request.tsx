import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FormRequest } from "./form-request";

export const DialogRequest = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" title="Nueva solicitud">
          Nueva solicitud
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[95svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva solicitud</DialogTitle>
          <DialogDescription>
            Detalla lo que buscas. Mientras más especifico seas, mejores
            opciones podremos ofrecerte.
          </DialogDescription>
        </DialogHeader>
       <FormRequest />
      </DialogContent>
    </Dialog>
  );
};
