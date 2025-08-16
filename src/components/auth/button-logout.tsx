"use client";
import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { logoutUserAction } from "@/actions/auth";

export const ButtonLogout = () => {
  const logout = async () => {
    const response = await logoutUserAction();
    if (!response.ok) {
      console.error(response.message);
      return;
    }
  };
  return (
    <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={logout}>
      <LogOutIcon className="text-red-600" />
      Salir
    </DropdownMenuItem>
  );
};
