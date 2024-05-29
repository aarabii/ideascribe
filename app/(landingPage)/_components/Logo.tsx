import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo_invert.svg"
        alt="Ideascribe Logo"
        width={40}
        height={40}
        className="dark:hidden"
      />
      <Image
        src="/logo.svg"
        alt="Ideascribe Logo"
        width={40}
        height={40}
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", font.className)}>Ideascribe</p>
    </div>
  );
};
