"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

const Custom404 = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-lg mt-4 font-light">
        We&apos;re sorry, but{" "}
        <strong className="font-semibold">{pathname.split("/").pop()}</strong>{" "}
        doesn&apos;t exist here.
      </p>

      <h1 className="text-4xl font-bold text-sky-500 underline hover:decoration-wavy hover:text-rose-500">
        Page Not Found
      </h1>
      <Button asChild className="mt-4 text-md">
        <Link href="/canvas">
          <Home className="h-4 w-4 mr-2" />
          Go back home
        </Link>
      </Button>
    </div>
  );
};

export default Custom404;
