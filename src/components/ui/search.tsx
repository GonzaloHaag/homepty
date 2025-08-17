"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import { ChangeEvent } from "react";

interface SearchProps {
  placeholder: string;
}
export const Search = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (event:ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.value) {
      params.set("search", event.target.value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <form className="relative w-full">
      <Input type="search" placeholder={placeholder} className="peer pl-10" onChange={handleSearch} defaultValue={searchParams.get("search")?.toString()} />
      <SearchIcon
        size={20}
        className="absolute left-3 text-gray-500 peer-focus:text-gray-900 mx-0 my-auto top-0 bottom-0"
      />
    </form>
  );
};
