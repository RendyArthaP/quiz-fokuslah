import Image from "next/image";
import FokuslahOnBoardingImages from "@/app/assets/fokuslah-onboarding.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src={FokuslahOnBoardingImages} alt="Fokuslah Onboarding" />
      <h1>Hi! Ready to boost </h1>
    </div>
  );
}
