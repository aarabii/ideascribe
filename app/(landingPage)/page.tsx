import { Footer } from "./_components/Footer";
import { Heading } from "./_components/Heading";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-[#080402]">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 md:py-20">
        <Heading />
      </div>
      <Footer />
    </div>
  );
}
