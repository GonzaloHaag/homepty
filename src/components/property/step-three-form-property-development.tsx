import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UnitPropertyWithImages } from "@/types/unit";
import { Trash2Icon } from "lucide-react";
import { FormUnityProperty } from "./form-unity-property";

interface StepThreeFormPropertyDevelopmentProps {
  units: UnitPropertyWithImages[];
  addUnity: (unit: UnitPropertyWithImages) => void;
}
export const StepThreeFormPropertyDevelopment = ({
  units,
  addUnity
}: StepThreeFormPropertyDevelopmentProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog((prevState) => !prevState);
  };
  return (
    <div className="flex flex-col gap-6 items-start">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button type="button" title="Agregar unidad">
            Agregar unidad
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-[800px] overflow-y-auto max-h-[95svh]">
          <DialogHeader>
            <DialogTitle>Crear unidad</DialogTitle>
            <DialogDescription className="text-balance">
              Aquí puedes agregar todos los detalles de la unidad
              correspondiente a la propiedad.
            </DialogDescription>
          </DialogHeader>
          <FormUnityProperty
            addUnity={addUnity}
            handleOpenDialog={handleOpenDialog}
          />
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-2">
          <h3>Unidades actuales: {units.length}</h3>
          {units.length === 0 && (
            <span className="text-muted-foreground text-sm">
              Aún no has agregado ninguna unidad para esta propiedad.
            </span>
          )}
        </div>
        {units.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tipo de unidad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre de la unidad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit, i) => (
                  <tr key={i}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                     {unit.tipo_unidad}
                    </th>
                    <td className="px-6 py-4">{unit.nombre_unidad}</td>
                    <td className="px-6 py-4">
                      <Button type="button" title="Borrar" size={"icon"} variant={"outline"}>
                        <Trash2Icon className="text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
