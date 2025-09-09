import { STATES, TYPES_PROPERTIES } from "@/utils/consts";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

export const FormRequest = () => {
  return (
    <form className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-y-2 items-start">
        <Label htmlFor="tipo_operacion">Tipo de operación</Label>
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-1">
            <Input type="radio" />
            <Label htmlFor="comprar">Comprar</Label>
          </div>
          <div className="flex items-center gap-x-1">
            <Input type="radio" />
            <Label htmlFor="rentar">Rentar</Label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="tipo_propiedad">Tipo de propiedad *</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            {TYPES_PROPERTIES.map((type) => (
              <SelectItem key={type.id} value={type.label}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label htmlFor="precio_minimo">Precio mínimo ($)</Label>
        <Input type="number" placeholder="1,000,000" />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="precio_maximo">Precio máximo ($)</Label>
        <Input type="number" placeholder="3,000,000" />
      </div>
      <hr className="col-span-2" />

      <h4 className="font-semibold col-span-2">¿Donde lo buscas?</h4>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="estado">Estado</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            {STATES.map((state) => (
              <SelectItem key={state.id} value={state.label}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="ciudad">Ciudad</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar ciudad" />
          </SelectTrigger>
          <SelectContent>
            {STATES.map((state) => (
              <SelectItem key={state.id} value={state.label}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="zona">Zona o colonia especifica (opcional)</Label>
        <div className="flex flex-col gap-y-1">
          <Input type="text" placeholder="Ej.Centro, Valle oriente, etc" />
          <span className="text-muted-foreground text-sm">
            Si tienes alguna zona específica en mente, indícala aquí.
          </span>
        </div>
      </div>

      <hr className="col-span-2" />
      <h4 className="font-semibold col-span-2">Caracteristicas deseadas</h4>
      <div className="col-span-2 grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="habitaciones">Habitaciones</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar habitaciones" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="+1">
                  +1
                </SelectItem>
                 <SelectItem value="+2">
                  +2
                </SelectItem>
                 <SelectItem value="+3">
                  +3
                </SelectItem>
                 <SelectItem value="+4">
                  +4
                </SelectItem>
            </SelectContent>
          </Select>
        </div>
          <div className="flex flex-col gap-y-2">
          <Label htmlFor="banios">Baños</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar banios" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="+1">
                  +1
                </SelectItem>
                 <SelectItem value="+2">
                  +2
                </SelectItem>
                 <SelectItem value="+3">
                  +3
                </SelectItem>
                 <SelectItem value="+4">
                  +4
                </SelectItem>
            </SelectContent>
          </Select>
        </div>
          <div className="flex flex-col gap-y-2">
          <Label htmlFor="estacionamientos">Estacionamientos</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar estacionamientos" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="+1">
                  +1
                </SelectItem>
                 <SelectItem value="+2">
                  +2
                </SelectItem>
                 <SelectItem value="+3">
                  +3
                </SelectItem>
                 <SelectItem value="+4">
                  +4
                </SelectItem>
            </SelectContent>
          </Select>
        </div>
          <div className="flex flex-col gap-y-2">
          <Label htmlFor="superficie">Superficie (m2)</Label>
          <Input type="number" placeholder="Ej.80" />
        </div>
      </div>

      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="detalles">Detalles adicionales</Label>
        <Textarea className="min-h-20 max-h-40" placeholder="Menciona cualquier característica o requerimiento adicional que tengas" />
      </div>
      <hr className="col-span-2" />
      <h4 className="font-semibold col-span-2">Datos de contacto</h4>
      <div className="col-span-2 grid grid-cols-3 gap-6">
         <div className="flex flex-col gap-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input type="text" placeholder="Ej. Juan Perez" />
         </div>
         <div className="flex flex-col gap-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input type="text" placeholder="test@example.com" />
         </div>
         <div className="flex flex-col gap-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input type="tel" placeholder="(81) 5689 9302" />
         </div>
      </div>

      <div className="flex items-center gap-x-2 col-span-2">
        <div>
            <Input type="checkbox" className="size-4" />
        </div>
        <Label htmlFor="terminos_condiciones" className="flex">
            Acepto los<Link href={"/terminos"} title="terminos">términos</Link>y<Link href={"/condiciones"} title="condiciones">condiciones</Link>y la<Link href={"/politica_privacidad"} title="politica de privacidad">pólitica de privacidad</Link>
        </Label>
      </div>

      <DialogFooter className="col-span-2">
          <DialogClose asChild>
             <Button type="button" variant={"outline"} title="Cancelar">
                Cancelar
             </Button>
          </DialogClose>
          <Button type="submit" title="Guardar">
            Guardar
          </Button>
      </DialogFooter>
    </form>
  );
};
