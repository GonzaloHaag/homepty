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

export const ButtonsHeaderProfile = () => {
  return (
    <div className="flex items-center gap-x-4">
      <Button type="button" title="Compartir">
        <Share2Icon /> Compartir
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" title="Agregar propiedad" variant={"outline"}>
            <PlusCircleIcon /> Agregar propiedad
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuLabel>Categorías</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/unit/create"} title="Unidad">
              Unidad
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/property/create/development"} title="Desarrollo">
              Desarrollo
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/property/create/industry"} title="Industria">
              Industria
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
