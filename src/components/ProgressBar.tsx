"use client";

import { useQuizContext } from "@/context/QuizContext";

const ProgressBar = () => {
  const { quizState, getQuestions } = useQuizContext();
  const { currentQuestion, score } = quizState;
  const questions = getQuestions();
  const total = questions.length;

  const progress = ((currentQuestion + 1) / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Soal {currentQuestion + 1} dari {total}
        </span>
        <span className="text-sm font-medium text-blue-500">
          Skor: {score}/{currentQuestion + 1}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-800 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              i <= currentQuestion ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
