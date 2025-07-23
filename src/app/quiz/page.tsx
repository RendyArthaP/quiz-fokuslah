"use client";

import React from "react";
import ProgressBar from "@/components/ProgressBar";
import QuizCard from "./components/QuizCard";
import { FeedbackCard } from "./components/FeedbackCard";
import { useQuizContext } from "@/context/QuizContext";
import Timer from "@/components/Timer";

const QuizPages = () => {
  const { showFeedback } = useQuizContext();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div />
          <Timer />
        </div>

        <ProgressBar />

        {!showFeedback ? <QuizCard /> : <FeedbackCard />}
      </div>
    </div>
  );
};

export default QuizPages;
