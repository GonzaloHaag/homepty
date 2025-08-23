"use client";
import { Dispatch, SetStateAction, useTransition } from "react";
import { updateStatusOfferByIdAction } from "@/actions/offer";
import { Button } from "@/components/ui/button";
import { OfferEntity } from "@/entities/offer";
import { formatMoney } from "@/utils/format-money";
import {
  ClockIcon,
  LoaderCircleIcon,
  MapPinIcon,
  PlayIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

interface CardOfferProps {
  offer: OfferEntity;
  setOffers: Dispatch<
    SetStateAction<
     OfferEntity[]
    >
  >;
}
export const CardOffer = ({ offer, setOffers }: CardOfferProps) => {
  const [isPending, startTransition] = useTransition();
  const updateStatusOffer = async (
    offerId: number,
    currentStatus: "Activa" | "Pausada"
  ) => {
    const newStatus = currentStatus === "Activa" ? "Pausada" : "Activa";
    startTransition(async () => {
      const response = await updateStatusOfferByIdAction(offerId, newStatus);
      if (!response.ok) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === offerId
            ? {
                ...offer,
                status: newStatus,
              }
            : offer
        )
      );
    });
  };

  const renderIconButton = () => {
    if(offer.status === "Activa") {
        return <ClockIcon />;
    } else {
        return <PlayIcon />;
    };
  };
  return (
    <div
      key={offer.id}
      className="w-full p-4 border border-gray-300 shadow-sm flex items-center justify-between text-sm rounded-md"
    >
      <div className="flex flex-col gap-y-2">
        <h4 className="font-medium">{`${
          offer.action
        } ${offer.tipos_propiedades.join(", ")}`}</h4>
        <div className="flex items-center gap-x-2">
          <MapPinIcon className="text-primary" size={16} />
          <span>{offer.ubicaciones.join(", ")}</span>
        </div>
        <span>
          Rango de precio:{" "}
          <b>{`${
            offer.min_price ? formatMoney(offer.min_price.toString()) : 0
          } - ${
            offer.max_price ? formatMoney(offer.max_price.toString()) : 0
          }`}</b>
        </span>
        <div className="flex items-center gap-x-2">
          <span>Urgencia: {offer.nivel_urgencia}</span>
          <span>|</span>
          <span>
            Creada el: {new Date(offer.created_at).toLocaleDateString()}
          </span>
          <span>|</span>
          <span>
            Estado:{" "}
            <b
              className={`${
                offer.status === "Activa" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {offer.status}
            </b>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          title="Cambiar estado"
          disabled={isPending}
          onClick={() => updateStatusOffer(offer.id, offer.status)}
        >
          {isPending ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            renderIconButton()
          )}
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          size={"icon"}
          title="Borrar"
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
};
