import { Navbar } from "./_components/Navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-[#080402]">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};

export default LandingPageLayout;
