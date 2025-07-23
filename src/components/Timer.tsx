"use client";

import React, { useEffect } from "react";
import { Clock, Pause, Play } from "lucide-react";
import { useQuizContext } from "@/context/QuizContext";

const Timer = () => {
  const { quizState, pauseQuiz, resumeQuiz, onTimeUp, updateTimeRemaining } =
    useQuizContext();
  const { timeRemaining, isPaused } = quizState;

  const [seconds, setSeconds] = React.useState(() => {
    // Ensure initial value is valid
    return typeof timeRemaining === "number" &&
      !isNaN(timeRemaining) &&
      timeRemaining >= 0
      ? timeRemaining
      : 240;
  });

  // Timer logic
  useEffect(() => {
    if (
      typeof timeRemaining === "number" &&
      !isNaN(timeRemaining) &&
      timeRemaining >= 0
    ) {
      setSeconds(timeRemaining);
    }
  }, [timeRemaining]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (
      !isPaused &&
      seconds > 0 &&
      typeof seconds === "number" &&
      !isNaN(seconds)
    ) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (typeof prev !== "number" || isNaN(prev) || prev < 0) {
            return 0;
          }

          const newValue = prev - 1;
          updateTimeRemaining(newValue);

          if (newValue <= 0) {
            onTimeUp();
            clearInterval(interval!);
          }

          return Math.max(0, newValue);
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, seconds, onTimeUp, updateTimeRemaining]);

  const formatTime = (seconds: number): string => {
    // Validate input
    if (typeof seconds !== "number" || isNaN(seconds) || seconds < 0) {
      return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (isPaused) return "text-gray-600 bg-gray-50 border-gray-300";
    if (typeof seconds !== "number" || isNaN(seconds))
      return "text-red-600 bg-red-50 border-red-200";
    if (seconds <= 30) return "text-red-600 bg-red-50 border-red-200";
    if (seconds <= 60) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-blue-600 bg-blue-50 border-blue-200";
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${getTimerColor()}`}
      >
        <Clock className="w-5 h-5" />
        <span className="font-bold text-lg tabular-nums">
          {formatTime(seconds)}
        </span>
        {isPaused && (
          <span className="text-xs font-medium bg-gray-200 px-2 py-1 rounded ml-2">
            PAUSED
          </span>
        )}
      </div>

      <button
        onClick={isPaused ? resumeQuiz : pauseQuiz}
        className={`p-2 rounded-lg border-2 transition-all duration-200 ${
          isPaused
            ? "border-green-300 bg-green-50 text-green-600 hover:border-green-400"
            : "border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400"
        }`}
        title={isPaused ? "Resume Quiz" : "Pause Quiz"}
      >
        {isPaused ? (
          <Play className="w-5 h-5" />
        ) : (
          <Pause className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default Timer;
