import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-3">
      <div className="min-h-svh flex-1 rounded-xl md:min-h-min">{children}</div>
    </div>
  );
};
