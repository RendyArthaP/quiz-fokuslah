"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import type { QuizState, Question } from "@/types/quiz.type";
import { spmMathQuestionsEnglish } from "@/lib/quiz-english";
import { spmMathQuestionsMalay } from "@/lib/quiz-malaysia";

// Replace the analytics import line with:
import {
  trackQuizStarted,
  trackLanguageChanged,
  trackQuestionViewed,
  trackAnswerSelected,
  trackQuizPaused,
  trackQuizResumed,
  trackQuestionTimeout,
  trackFeedbackViewed,
  trackQuizCompleted,
  trackQuizRestarted,
  getAnalyticsSummary,
} from "@/analytics/analytics";
import type { QuestionAnalyticsData } from "@/types/analytics.type";

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
  // Add analytics data to context type
  analyticsData: {
    pauseCount: number;
    totalPauseDuration: number;
    languageSwitches: number;
    questionsTimedOut: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAnalyticsSummary: () => any;
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

  // Quiz state - TANPA localStorage, dengan proper validation
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

  // Add analytics tracking state
  const [analyticsData, setAnalyticsData] = useState({
    pauseCount: 0,
    totalPauseDuration: 0,
    languageSwitches: 0,
    questionsTimedOut: 0,
    pauseStartTime: null as Date | null,
  });

  const getCurrentQuestion = useCallback(() => {
    const questions = getQuestions();
    return questions[quizState.currentQuestion] || questions[0];
  }, [getQuestions, quizState.currentQuestion]);

  // Update setLanguage function to track language changes
  const setLanguage = useCallback(
    (lang: Language) => {
      const previousLanguage = currentLanguage;
      setCurrentLanguage(lang);

      // Track language change
      if (previousLanguage !== lang) {
        trackLanguageChanged(previousLanguage, lang);
        setAnalyticsData((prev) => ({
          ...prev,
          languageSwitches: prev.languageSwitches + 1,
        }));
      }

      // Reset quiz saat ganti bahasa
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

      // Track quiz restart due to language change
      trackQuizStarted(lang);
    },
    [currentLanguage]
  );

  // Update pauseQuiz function
  const pauseQuiz = useCallback(() => {
    const pauseStartTime = new Date();
    setQuizState((prev) => ({
      ...prev,
      isPaused: true,
      pausedAt: pauseStartTime,
    }));

    setAnalyticsData((prev) => ({
      ...prev,
      pauseCount: prev.pauseCount + 1,
      pauseStartTime,
    }));

    // Track pause event
    trackQuizPaused(
      quizState.currentQuestion + 1,
      Date.now() - quizState.startTime.getTime()
    );
  }, [quizState.currentQuestion, quizState.startTime]);

  // Update resumeQuiz function
  const resumeQuiz = useCallback(() => {
    const resumeTime = new Date();
    const pauseDuration = analyticsData.pauseStartTime
      ? resumeTime.getTime() - analyticsData.pauseStartTime.getTime()
      : 0;

    setQuizState((prev) => ({
      ...prev,
      isPaused: false,
      pausedAt: undefined,
    }));

    setAnalyticsData((prev) => ({
      ...prev,
      totalPauseDuration: prev.totalPauseDuration + pauseDuration,
      pauseStartTime: null,
    }));

    // Track resume event
    trackQuizResumed(quizState.currentQuestion + 1, pauseDuration);
  }, [analyticsData.pauseStartTime, quizState.currentQuestion]);

  // Helper function untuk pilih jawaban salah secara random
  const getRandomWrongAnswer = useCallback(
    (correctAnswer: number, totalOptions: number): number => {
      const wrongOptions = [];
      for (let i = 0; i < totalOptions; i++) {
        if (i !== correctAnswer) {
          wrongOptions.push(i);
        }
      }
      // Pilih random dari jawaban yang salah
      const randomIndex = Math.floor(Math.random() * wrongOptions.length);
      return wrongOptions[randomIndex];
    },
    []
  );

  // Update answerQuestion function
  const answerQuestion = useCallback(
    (answerIndex: number) => {
      // Existing guards...
      if (quizState.isPaused) {
        console.warn("Cannot answer question while quiz is paused");
        return;
      }

      if (quizState.answers[quizState.currentQuestion] !== null) {
        console.warn("Question already answered");
        return;
      }

      const currentQ = getCurrentQuestion();
      const isCorrect = answerIndex === currentQ.correctAnswer;
      const timeTaken = currentQ.timeLimit - quizState.timeRemaining;

      // Track answer selection
      const questionAnalytics: QuestionAnalyticsData = {
        question_id: currentQ.id,
        question_difficulty: currentQ.difficulty,
        selected_answer: answerIndex,
        correct_answer: currentQ.correctAnswer,
        is_correct: isCorrect,
        time_taken: timeTaken,
        time_remaining: quizState.timeRemaining,
        was_paused: analyticsData.pauseCount > 0,
      };

      trackAnswerSelected(questionAnalytics);

      // Existing state update logic...
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

      // Track feedback viewed
      trackFeedbackViewed(
        currentQ.id,
        isCorrect,
        isCorrect ? "correct" : "incorrect"
      );
    },
    [
      getCurrentQuestion,
      quizState.isPaused,
      quizState.answers,
      quizState.currentQuestion,
      quizState.timeRemaining,
      analyticsData.pauseCount,
    ]
  );

  // Update nextQuestion function
  const nextQuestion = useCallback(() => {
    setShowFeedback(false);
    const questions = getQuestions();

    if (quizState.currentQuestion < questions.length - 1) {
      const nextQuestionIndex = quizState.currentQuestion + 1;
      const nextQuestion = questions[nextQuestionIndex];

      setQuizState((prev) => ({
        ...prev,
        currentQuestion: nextQuestionIndex,
        timeRemaining: nextQuestion?.timeLimit || 240,
      }));

      // Track next question viewed
      trackQuestionViewed(
        nextQuestion.id,
        nextQuestion.difficulty,
        nextQuestion.question
      );
    } else {
      // Quiz completed - track completion
      const endTime = new Date();
      const totalDuration = endTime.getTime() - quizState.startTime.getTime();
      const questions = getQuestions();

      trackQuizCompleted({
        session_id: getAnalyticsSummary().sessionId,
        language: currentLanguage,
        start_time: quizState.startTime,
        end_time: endTime,
        total_duration: Math.round(totalDuration / 1000), // in seconds
        total_questions: questions.length,
        correct_answers: quizState.score,
        accuracy_rate: Math.round((quizState.score / questions.length) * 100),
        final_score: quizState.score,
        pause_count: analyticsData.pauseCount,
        total_pause_duration: Math.round(
          analyticsData.totalPauseDuration / 1000
        ),
        language_switches: analyticsData.languageSwitches,
        questions_timed_out: analyticsData.questionsTimedOut,
      });

      setQuizState((prev) => ({
        ...prev,
        isCompleted: true,
        endTime: endTime,
      }));
    }
  }, [
    getQuestions,
    quizState.currentQuestion,
    quizState.startTime,
    quizState.score,
    currentLanguage,
    analyticsData,
  ]);

  // Update onTimeUp function
  const onTimeUp = useCallback(() => {
    // Existing guards...
    if (quizState.isPaused) return;
    if (showFeedback) return;
    if (quizState.answers[quizState.currentQuestion] !== null) return;

    console.log("⏰ Time's up! Auto-selecting wrong answer...");

    const currentQ = getCurrentQuestion();

    // Track timeout
    trackQuestionTimeout(currentQ.id, currentQ.difficulty);
    setAnalyticsData((prev) => ({
      ...prev,
      questionsTimedOut: prev.questionsTimedOut + 1,
    }));

    // Existing wrong answer selection logic...
    const wrongAnswer = getRandomWrongAnswer(
      currentQ.correctAnswer,
      currentQ.options.length
    );

    // Track the auto-selected wrong answer
    const questionAnalytics: QuestionAnalyticsData = {
      question_id: currentQ.id,
      question_difficulty: currentQ.difficulty,
      selected_answer: wrongAnswer,
      correct_answer: currentQ.correctAnswer,
      is_correct: false,
      time_taken: currentQ.timeLimit,
      time_remaining: 0,
      was_paused: analyticsData.pauseCount > 0,
    };

    trackAnswerSelected(questionAnalytics);

    // Existing state update...
    setQuizState((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestion] = wrongAnswer;

      return {
        ...prev,
        answers: newAnswers,
      };
    });

    setShowFeedback(true);
    trackFeedbackViewed(currentQ.id, false, "timeout");
  }, [
    showFeedback,
    getCurrentQuestion,
    quizState.isPaused,
    quizState.answers,
    quizState.currentQuestion,
    getRandomWrongAnswer,
    analyticsData.pauseCount,
  ]);

  const updateTimeRemaining = useCallback((time: number) => {
    // Validate time is a number
    if (typeof time === "number" && !isNaN(time)) {
      setQuizState((prev) => ({
        ...prev,
        timeRemaining: Math.max(0, time), // Ensure non-negative
      }));
    }
  }, []);

  // Update resetQuiz function
  const resetQuiz = useCallback(() => {
    const questions = getQuestions();

    // Track restart
    trackQuizRestarted(quizState.score, 1);

    // Reset analytics data
    setAnalyticsData({
      pauseCount: 0,
      totalPauseDuration: 0,
      languageSwitches: 0,
      questionsTimedOut: 0,
      pauseStartTime: null,
    });

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

    // Track new quiz start
    trackQuizStarted(currentLanguage);

    // Track first question viewed
    if (questions[0]) {
      trackQuestionViewed(
        questions[0].id,
        questions[0].difficulty,
        questions[0].question
      );
    }
  }, [getQuestions, quizState.score, currentLanguage]);

  // Add analytics data to context value
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
    // Add analytics data
    analyticsData,
    getAnalyticsSummary: () => getAnalyticsSummary(),
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
