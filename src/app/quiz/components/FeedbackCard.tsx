"use client";

import {
  CheckCircle,
  XCircle,
  Lightbulb,
  TrendingUp,
  Heart,
} from "lucide-react";
import { useQuizContext } from "@/context/QuizContext";
import { useRouter } from "next/navigation";

export function FeedbackCard() {
  const router = useRouter();
  const {
    getCurrentQuestion,
    quizState,
    nextQuestion,
    getQuestions,
    currentLanguage,
  } = useQuizContext();

  const { isPaused } = quizState;

  const question = getCurrentQuestion();
  const selectedAnswer = quizState.answers[quizState.currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion =
    quizState.currentQuestion === getQuestions().length - 1;

  const handleNext = () => {
    if (isPaused) {
      return;
    }
    if (isLastQuestion) {
      router.push("/result");
    }

    nextQuestion();
  };

  const handleWordingFeedback = () => {
    if (isCorrect) {
      return currentLanguage === "my" ? "Benar!" : "Correct!";
    } else {
      return currentLanguage === "my" ? "Belum Tepat" : "Incorrect!";
    }
  };

  const handleWordingButton = () => {
    if (isLastQuestion) {
      return currentLanguage === "my" ? "Lihat Hasil" : "See Results";
    } else {
      return currentLanguage === "my" ? "Lanjut Soal Berikutnya" : "Next";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-blue-400">
      <div className="flex items-center gap-3 mb-4">
        {isCorrect ? (
          <CheckCircle className="w-8 h-8 text-green-500" />
        ) : (
          <XCircle className="w-8 h-8 text-red-500" />
        )}
        <h3
          className={`text-xl font-bold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {handleWordingFeedback()}
        </h3>
      </div>

      {/* Motivational Message */}
      {isCorrect ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-800 font-medium">
            {question.motivationalText}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-sm text-green-700">{question.statisticText}</p>
          </div>
        </div>
      ) : (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-orange-600" />
            <p className="text-orange-800 font-medium">
              {currentLanguage === "my"
                ? "Nggak apa-apa! Setiap salah itu langkah menuju benar!"
                : "No worries! Every mistake is a step towards the right answer!"}
            </p>
          </div>
          <p className="text-sm text-orange-700 mt-1">
            {currentLanguage === "my"
              ? "Terus berusaha, kamu pasti bisa!"
              : "Keep trying, you can do it!"}
          </p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">
            {currentLanguage === "my" ? "Penjelasan:" : "Explanation:"}
          </span>
        </div>
        <p className="text-blue-700">{question.explanation}</p>
      </div>

      <button
        onClick={handleNext}
        disabled={isPaused}
        className="w-full bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
      >
        {handleWordingButton()}
      </button>
    </div>
  );
}
