import { Navbar } from "./_components/Navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#080402]">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default LandingPageLayout;
