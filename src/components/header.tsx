import { PropsWithChildren } from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";


interface HeaderProps extends PropsWithChildren {
  title:string;
}

export const Header = ({ children, title } : HeaderProps ) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b">
      <div className="flex items-center justify-between gap-2 px-4 w-full">
        <div className="flex items-center gap-x-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <span className="text-lg font-semibold">{ title }</span>
        </div>
        { children }
      </div>
    </header>
  );
};
