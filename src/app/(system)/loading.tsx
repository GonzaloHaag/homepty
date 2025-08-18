import { Header } from "@/components/header";
import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
    return (
        <>
          <Header title="Cargando página..." />
          <div className="w-full flex items-center justify-center py-10">
            <LoaderCircleIcon className="text-primary animate-spin" size={40} />
        </div>
        </>
    );
}