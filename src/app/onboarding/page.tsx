"use client";
import BirdChatImages from "@/app/assets/bird_chat.svg";
import ArrowRight from "@/app/assets/arrow-right.svg";
import ArrowLeft from "@/app/assets/arrow-left.svg";
import { useRouter } from "next/navigation";

import { useQuizContext } from "@/context/QuizContext";
import Image from "next/image";
import React from "react";
import LanguangeBar from "./components/LanguangeBar/LanguangeBar";

const OnboardingPages = () => {
  const { setLanguage, currentLanguage } = useQuizContext();
  const router = useRouter();

  const handleNextOnBoarding = () => {
    router.push("/quiz");
  };

  const handleBackOnBoarding = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex flex-row items-center mb-8">
        <Image src={BirdChatImages} alt="Bird Chat" width={50} height={50} />
        <div className="relative border border-gray-400 rounded-lg p-2 bg-white shadow-md ml-2">
          <div
            className="absolute left-0 top-1/2 -translate-x-full translate-y-[-50%]"
            style={{
              width: "0px",
              height: "0px",
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "8px solid #99a1af",
            }}
          />
          <div
            className="absolute left-0 top-1/2 -translate-x-[calc(100%-1px)] translate-y-[-50%]"
            style={{
              width: "0px",
              height: "0px",
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderRight: "7px solid #fff",
            }}
          />
          <h1 className="text-2xl font-bold m-0">
            Which languange do you prefer
          </h1>
        </div>
      </div>
      <LanguangeBar
        active={currentLanguage === "my"}
        typeCountry="my"
        onClick={() => setLanguage("my")}
      />
      <LanguangeBar
        active={currentLanguage === "en"}
        typeCountry="en"
        onClick={() => setLanguage("en")}
      />
      <footer className="text-center fixed bottom-0 left-0 w-full bg-white p-4 flex items-center justify-between gap-4 border-t border-gray-200">
        <button
          onClick={handleBackOnBoarding}
          className="w-20 font-bold flex items-center rounded-xl px-5 py-3 space-x-[4px] transition-colors duration-200 cursor-pointer border border-orange-400 hover:bg-orange-40/80"
        >
          <div className="flex flex-row items-center justify-center space-x-2">
            <Image src={ArrowLeft} alt="Arrow Right" width={16} height={16} />
            <span className="text-orange-400 text-center font-normal text-sm flex m-auto">
              Back
            </span>
          </div>
        </button>
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
};

export default OnboardingPages;
