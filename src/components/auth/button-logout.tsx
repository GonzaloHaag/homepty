"use client";
import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { logoutUserAction } from "@/server/actions/auth";
import { useQueryClient } from "@tanstack/react-query";

export const ButtonLogout = () => {
  const queryClient = useQueryClient();
  const logout = async () => {
    const response = await logoutUserAction();
    if (!response.ok) {
      console.error(response.message);
      return;
    }
    queryClient.clear();
  };
  return (
    <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={logout}>
      <LogOutIcon className="text-red-600" />
      Salir
    </DropdownMenuItem>
  );
};
