"use client";
import { PlusCircleIcon, Share2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { FormProperty } from "../property";

export const ButtonsHeaderProfile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialog = () => {
    setOpenDialog((prevState) => !prevState);
  };
  return (
    <div className="flex items-center gap-x-4">
      <Button type="button" title="Compartir">
        <Share2Icon /> Compartir
      </Button>

      {/* Este dialog solo se usa para Unidad */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" title="Agregar propiedad" variant={"outline"}>
              <PlusCircleIcon /> Agregar propiedad
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 mr-4">
            <DropdownMenuLabel>Categoría</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Unidad abre el dialog */}
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <span>Unidad</span>
              </DropdownMenuItem>
            </DialogTrigger>

            {/* Desarrollo es un link */}
            <DropdownMenuItem asChild>
              <Link href={"/property/create/development"} title="Desarrollo">
                Desarrollo
              </Link>
            </DropdownMenuItem>

            {/* Industria es un link */}
            <DropdownMenuItem asChild>
              <Link href={"/property/create/industry"} title="Industria">
                Industria
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Contenido del modal para Unidad */}
        <DialogContent className="w-full md:max-w-4xl max-h-[95svh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear Unidad</DialogTitle>
            <DialogDescription>
              Colocá los detalles de la unidad
            </DialogDescription>
          </DialogHeader>
          <FormProperty handleDialog={ handleDialog } />
        </DialogContent>
      </Dialog>
    </div>
  );
};
