"use client";

import NavLinks from "./navbar/NavLinks";
import SearchBar from "./navbar/SearchBar";
import Notifications from "./navbar/Notifications";
import UserMenu from "./navbar/UserMenu";
import LogoutButton from "./navbar/LogoutButton";
import { Menu } from "lucide-react";

type NavbarProps = {
  onMenuClick?: () => void;
};

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  return (
    <div className="h-[52px] bg-[#0f1a0f] border border-white/5 rounded-xl px-3 md:px-6 flex items-center justify-between mb-5">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            w-9 h-9
            rounded-lg
            border border-white/10
            flex items-center justify-center
            text-white/50
            hover:bg-white/5
          "
        >
          <Menu size={18} />
        </button>

        <NavLinks />

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <SearchBar />
        <Notifications />
        <UserMenu />
        <LogoutButton />
      </div>

    </div>
  );
}