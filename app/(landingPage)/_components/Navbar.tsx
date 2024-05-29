"use client";

import { useScrollTop } from "@/hook/useScrollTop";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const scrolled = useScrollTop(10);
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#080402] fixed top-0 flex items-center w-full p-6 transition-all duration-300",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
};
