"use client";

import Image from "next/image";
import FokuslahOnBoardingImages from "@/app/assets/fokuslah-onboarding.png";
import ArrowRight from "@/app/assets/arrow-right.svg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNextOnBoarding = () => {
    router.push("/onboarding");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Image
        src={FokuslahOnBoardingImages}
        alt="Fokuslah Onboarding"
        width={256}
        height={256}
        loading="lazy"
      />
      <h1 className="text-2xl font-bold mt-4">Hi! Ready to boost score SPM?</h1>
      <span className="text-2xl mt-2 text-gray-400">
        Boost SPM marks, start now.
      </span>
      <footer className="text-center fixed bottom-0 left-0 w-full bg-white p-4 flex items-center justify-end gap-4 border-t border-gray-200">
        <button
          onClick={handleNextOnBoarding}
          className="w-20 font-bold flex items-center rounded-xl px-5 py-3 space-x-[4px] transition-colors duration-200 cursor-pointer bg-orange-400 hover:bg-orange-40/80"
        >
          <div className="flex flex-row items-center justify-center space-x-2">
            <span className="text-white text-center font-bold text-sm flex m-auto">
              Next
            </span>
            <Image src={ArrowRight} alt="Arrow Right" width={16} height={16} />
          </div>
        </button>
      </footer>
    </div>
  );
}
