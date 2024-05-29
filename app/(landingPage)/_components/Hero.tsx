import Image from "next/image";
import hero_Bg from "@/assets/hero_bg.svg";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl dark:bg-[#080402]">
      <div className="hidden md:block sm:w-0 md:w-[350px] md:h-[233px] lg:w-[400px] lg:h-[267px] xl:w-[500px] xl:h-[333px] 2xl:w-[625px] 2xl:h-[417px] relative">
        <Image
          src={hero_Bg}
          alt="Hero Background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
