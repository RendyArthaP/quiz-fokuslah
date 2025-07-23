"use client";

import { useQuizContext } from "@/context/QuizContext";

const QuizCard = () => {
  const { getCurrentQuestion, quizState, answerQuestion } = useQuizContext();
  const question = getCurrentQuestion();
  const selectedAnswer = quizState.answers[quizState.currentQuestion];
  const { isPaused } = quizState;

  const handleAnswerClick = (index: number) => {
    // Guard: Tidak bisa pilih jawaban jika quiz di-pause
    if (isPaused) {
      return;
    }

    // Guard: Tidak bisa pilih jawaban jika sudah dijawab
    if (selectedAnswer !== null) {
      return;
    }

    answerQuestion(index);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            question.difficulty === "easy"
              ? "bg-green-100 text-green-800"
              : question.difficulty === "medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {question.difficulty === "easy"
            ? "Mudah"
            : question.difficulty === "medium"
            ? "Sedang"
            : "Sulit"}
        </div>

        <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswer !== null || isPaused}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              // Styling saat pause
              isPaused
                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                : // Styling saat sudah dijawab
                selectedAnswer === index
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : // Styling normal
                selectedAnswer !== null
                ? "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                : // Styling hover (hanya jika tidak pause dan belum dijawab)
                  "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer hover:scale-105"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  isPaused
                    ? "border-gray-300 bg-gray-100 text-gray-400"
                    : selectedAnswer === index
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span
                className={`font-medium ${isPaused ? "text-gray-400" : ""}`}
              >
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
