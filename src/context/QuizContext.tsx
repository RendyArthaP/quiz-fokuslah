"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import type { QuizState, Question } from "@/types/quiz.type";
import { spmMathQuestionsEnglish } from "@/lib/quiz-english";
import { spmMathQuestionsMalay } from "@/lib/quiz-malaysia";

type Language = "my" | "en";

interface QuizContextType {
  // State
  quizState: QuizState;
  showFeedback: boolean;
  currentLanguage: Language;

  // Actions
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  pauseQuiz: () => void;
  resumeQuiz: () => void;
  onTimeUp: () => void;
  updateTimeRemaining: (time: number) => void;
  setLanguage: (lang: Language) => void;

  // Helpers
  getCurrentQuestion: () => Question;
  getQuestions: () => Question[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  // Language state - default ke Bahasa Malaysia
  const [currentLanguage, setCurrentLanguage] = useState<Language>("my");

  // Get questions based on language
  const getQuestions = useCallback(() => {
    switch (currentLanguage) {
      case "en":
        return spmMathQuestionsEnglish;
      default:
        return spmMathQuestionsMalay;
    }
  }, [currentLanguage]);

  // Quiz state
  const [quizState, setQuizState] = useState<QuizState>(() => {
    const questions = getQuestions();
    return {
      currentQuestion: 0,
      answers: new Array(questions.length).fill(null),
      score: 0,
      isCompleted: false,
      startTime: new Date(),
      isPaused: false,
      timeRemaining: questions[0]?.timeLimit || 240, // fallback ke 4 menit
    };
  });

  const [showFeedback, setShowFeedback] = useState(false);

  const getCurrentQuestion = useCallback(() => {
    const questions = getQuestions();
    return questions[quizState.currentQuestion] || questions[0];
  }, [getQuestions, quizState.currentQuestion]);

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    // Reset quiz when change languange
    const questions =
      lang === "en" ? spmMathQuestionsEnglish : spmMathQuestionsMalay;

    setQuizState({
      currentQuestion: 0,
      answers: new Array(questions.length).fill(null),
      score: 0,
      isCompleted: false,
      startTime: new Date(),
      isPaused: false,
      timeRemaining: questions[0]?.timeLimit || 240,
    });
    setShowFeedback(false);
  }, []);

  const pauseQuiz = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      isPaused: true,
      pausedAt: new Date(),
    }));
  }, []);

  const resumeQuiz = useCallback(() => {
    setQuizState((prev) => ({
      ...prev,
      isPaused: false,
      pausedAt: undefined,
    }));
  }, []);

  const answerQuestion = useCallback(
    (answerIndex: number) => {
      // 🛡️ GUARD: Tidak bisa jawab jika quiz di-pause
      if (quizState.isPaused) {
        console.warn("Cannot answer question while quiz is paused");
        return;
      }

      // 🛡️ GUARD: Tidak bisa jawab jika sudah dijawab
      if (quizState.answers[quizState.currentQuestion] !== null) {
        console.warn("Question already answered");
        return;
      }

      const currentQ = getCurrentQuestion();
      const isCorrect = answerIndex === currentQ.correctAnswer;

      setQuizState((prev) => {
        const newAnswers = [...prev.answers];
        newAnswers[prev.currentQuestion] = answerIndex;

        return {
          ...prev,
          answers: newAnswers,
          score: isCorrect ? prev.score + 1 : prev.score,
        };
      });

      setShowFeedback(true);
    },
    [
      getCurrentQuestion,
      quizState.isPaused,
      quizState.answers,
      quizState.currentQuestion,
    ]
  );

  const nextQuestion = useCallback(() => {
    setShowFeedback(false);
    const questions = getQuestions();

    if (quizState.currentQuestion < questions.length - 1) {
      const nextQuestionIndex = quizState.currentQuestion + 1;
      const nextQuestion = questions[nextQuestionIndex];

      setQuizState((prev) => ({
        ...prev,
        currentQuestion: nextQuestionIndex,
        timeRemaining: nextQuestion?.timeLimit || 240, // fallback
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        isCompleted: true,
        endTime: new Date(),
      }));
    }
  }, [getQuestions, quizState.currentQuestion]);

  const onTimeUp = useCallback(() => {
    // 🛡️ GUARD: Tidak auto-submit jika quiz di-pause
    if (quizState.isPaused) {
      return;
    }

    if (!showFeedback) {
      // Auto submit dengan jawaban null jika waktu habis
      answerQuestion(-1); // -1 indicates no answer selected
    }
  }, [showFeedback, answerQuestion, quizState.isPaused]);

  const updateTimeRemaining = useCallback((time: number) => {
    // Validate time is a number
    if (typeof time === "number" && !isNaN(time)) {
      setQuizState((prev) => ({
        ...prev,
        timeRemaining: Math.max(0, time), // Ensure non-negative
      }));
    }
  }, []);

  const resetQuiz = useCallback(() => {
    const questions = getQuestions();
    setQuizState({
      currentQuestion: 0,
      answers: new Array(questions.length).fill(null),
      score: 0,
      isCompleted: false,
      startTime: new Date(),
      isPaused: false,
      timeRemaining: questions[0]?.timeLimit || 240,
    });
    setShowFeedback(false);
  }, [getQuestions]);

  const value = {
    quizState,
    showFeedback,
    currentLanguage,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    pauseQuiz,
    resumeQuiz,
    onTimeUp,
    updateTimeRemaining,
    setLanguage,
    getCurrentQuestion,
    getQuestions,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
}
