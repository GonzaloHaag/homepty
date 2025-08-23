"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
export const ButtonBack = () => {
  const router = useRouter();
  const buttonOnClick = () => {
    router.back();
  };
  return (
    <Button title="regresar" variant={"outline"} onClick={buttonOnClick}>
      Regresar
    </Button>
  );
};
