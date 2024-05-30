"use client";

import { Fragment } from "react";
import Link from "next/link";

import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

import { useScrollTop } from "@/hook/useScrollTop";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
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
        {isLoading && <Spinner />}
        {!isLoading && !isAuthenticated && (
          <Fragment>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Started</Button>
            </SignInButton>
          </Fragment>
        )}
        {isAuthenticated && !isLoading && (
          <Fragment>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/canvas">Get Started</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </Fragment>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
