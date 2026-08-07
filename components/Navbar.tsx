"use client";

import { Menu } from "lucide-react";
import SearchBar from "./navbar/SearchBar";
import UserMenu from "./navbar/UserMenu";
import LogoutButton from "./navbar/LogoutButton";

type NavbarProps = {
  onMenuClick?: () => void;
};

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  return (
    <div
      className="
        min-h-[52px]
        bg-[#0f1a0f]
        border
        border-white/5
        rounded-xl
        px-3
        md:px-6
        flex
        items-center
        justify-between
        gap-3
        mb-5
        overflow-hidden
      "
    >

      {/* IZQUIERDA */}
<div
  className="
    flex
    items-center
    gap-3
    flex-1
    min-w-0
  "
>

        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            w-9
            h-9
            rounded-lg
            border
            border-white/10
            flex
            items-center
            justify-center
            text-white/50
            hover:bg-white/5
          "
        >
          <Menu size={18} />
        </button>


        {/* BUSCADOR */}
        <div className="flex-1
                        min-w-0
                        max-w-md
                        "
                        >
          <SearchBar />
        </div>

      </div>


      {/* DERECHA */}
      <div
        className="
          flex
          items-center
          gap-2
        "
      >



        <UserMenu />

        <div className="shrink-0">
          <LogoutButton />
        </div>

      </div>

    </div>
  );
}