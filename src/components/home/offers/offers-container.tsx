"use client";
import { useEffect, useState } from "react";
import { getOffersByUserId } from "@/actions/offer";
import { OfferEntity } from "@/entities/offer";
import { Skeleton } from "../../ui/skeleton";
import { CardOffer } from "./card-offer";

export const OffersContainer = () => {
  const [offers, setOffers] = useState<OfferEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getOffers = async () => {
    try {
      const response = await getOffersByUserId();
      if (!response.ok || !response.data) {
        console.error(response.message);
        return;
      }
      setOffers(response.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOffers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-full min-h-32 animate-pulse" />
        <Skeleton className="w-full min-h-32 animate-pulse" />
      </div>
    );
  }
  return (
    <section className="flex flex-col gap-y-2 max-h-[400px] overflow-y-auto">
      {offers.length > 0 ? (
        offers.map((offer) => (
          <CardOffer key={offer.id} offer={offer} setOffers={setOffers} />
        ))
      ) : (
        <span className="text-muted-foreground text-sm text-center">
          No has creado ninguna oferta
        </span>
      )}
    </section>
  );
};
