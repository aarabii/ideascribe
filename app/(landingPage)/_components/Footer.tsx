import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div className="w-full p-6 bg-background dark:bg-[#080402] flex items-center">
      <Logo />
      <div className="ml-auto flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms of Service
        </Button>
        <Button variant="ghost" size="sm">
          Contact Us
        </Button>
      </div>
    </div>
  );
};
