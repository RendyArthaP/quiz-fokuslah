/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AnalyticsEvent,
  AnalyticsProvider,
  QuizAnalyticsData,
  QuestionAnalyticsData,
  UserInteractionEvent,
} from "@/types/analytics.type";

// Generate unique session ID
const generateSessionId = (): string => {
  return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Analytics state (using closure instead of class properties)
let providers: AnalyticsProvider[] = [];
let sessionId: string = generateSessionId();
let events: UserInteractionEvent[] = [];
let isEnabled: boolean = true;

// Initialize analytics providers
const initializeProviders = () => {
  if (typeof window === "undefined") return;

  // Example: Initialize Google Analytics 4
  if (process.env.NEXT_PUBLIC_GA_ID) {
    console.log("📊 Analytics: GA4 initialized");
  }

  // Example: Initialize Mixpanel
  if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    console.log("📊 Analytics: Mixpanel initialized");
  }
};

// Add analytics providers
export const addProvider = (provider: AnalyticsProvider) => {
  providers.push(provider);
};

// Core tracking function
const track = (eventName: string, properties: Record<string, any> = {}) => {
  if (!isEnabled) return;

  const event: AnalyticsEvent = {
    event_name: eventName,
    properties: {
      ...properties,
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      user_agent:
        typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
      page_url:
        typeof window !== "undefined" ? window.location.href : "unknown",
    },
    timestamp: new Date(),
    session_id: sessionId,
  };

  // Store event locally
  events.push({
    event_type: eventName as any,
    timestamp: new Date(),
    data: properties,
  });

  // Send to all providers
  providers.forEach((provider) => {
    try {
      provider.track(event);
    } catch (error) {
      console.error("📊 Analytics Error:", error);
    }
  });

  console.log("📊 Analytics Event:", eventName, properties);
};

// Quiz-specific tracking functions
export const trackQuizStarted = (language: "my" | "en") => {
  track("quiz_started", {
    language,
    session_start: new Date().toISOString(),
  });
};

export const trackLanguageChanged = (
  fromLanguage: "my" | "en",
  toLanguage: "my" | "en"
) => {
  track("language_changed", {
    from_language: fromLanguage,
    to_language: toLanguage,
  });
};

export const trackQuestionViewed = (
  questionId: number,
  difficulty: string,
  questionText: string
) => {
  track("question_viewed", {
    question_id: questionId,
    difficulty,
    question_text: questionText.substring(0, 100), // First 100 chars only
    view_timestamp: new Date().toISOString(),
  });
};

export const trackAnswerSelected = (data: QuestionAnalyticsData) => {
  track("answer_selected", {
    question_id: data.question_id,
    difficulty: data.question_difficulty,
    selected_answer: data.selected_answer,
    correct_answer: data.correct_answer,
    is_correct: data.is_correct,
    time_taken: data.time_taken,
    time_remaining: data.time_remaining,
    was_paused: data.was_paused,
    pause_duration: data.pause_duration || 0,
  });
};

export const trackQuizPaused = (questionId: number, timeElapsed: number) => {
  track("quiz_paused", {
    question_id: questionId,
    time_elapsed: timeElapsed,
    pause_timestamp: new Date().toISOString(),
  });
};

export const trackQuizResumed = (questionId: number, pauseDuration: number) => {
  track("quiz_resumed", {
    question_id: questionId,
    pause_duration: pauseDuration,
    resume_timestamp: new Date().toISOString(),
  });
};

export const trackQuestionTimeout = (
  questionId: number,
  difficulty: string
) => {
  track("question_timeout", {
    question_id: questionId,
    difficulty,
    timeout_timestamp: new Date().toISOString(),
  });
};

export const trackFeedbackViewed = (
  questionId: number,
  isCorrect: boolean,
  feedbackType: string
) => {
  track("feedback_viewed", {
    question_id: questionId,
    is_correct: isCorrect,
    feedback_type: feedbackType,
    view_timestamp: new Date().toISOString(),
  });
};

export const trackQuizCompleted = (data: QuizAnalyticsData) => {
  track("quiz_completed", {
    session_id: data.session_id,
    language: data.language,
    total_duration: data.total_duration,
    total_questions: data.total_questions,
    correct_answers: data.correct_answers,
    accuracy_rate: data.accuracy_rate,
    final_score: data.final_score,
    pause_count: data.pause_count,
    total_pause_duration: data.total_pause_duration,
    language_switches: data.language_switches,
    questions_timed_out: data.questions_timed_out,
    completion_timestamp: new Date().toISOString(),
  });
};

export const trackResultsViewed = (
  finalScore: number,
  accuracyRate: number,
  totalTime: number
) => {
  track("results_viewed", {
    final_score: finalScore,
    accuracy_rate: accuracyRate,
    total_time: totalTime,
    view_timestamp: new Date().toISOString(),
  });
};

export const trackQuizRestarted = (
  previousScore: number,
  sessionCount: number
) => {
  track("quiz_restarted", {
    previous_score: previousScore,
    session_count: sessionCount,
    restart_timestamp: new Date().toISOString(),
  });
};

// Utility functions
export const getAnalyticsSummary = () => ({
  sessionId,
  totalEvents: events.length,
  events,
});

// Initialize on import (browser only)
if (typeof window !== "undefined") {
  initializeProviders();
}

// Default export object for backward compatibility
const analytics = {
  addProvider,
  trackQuizStarted,
  trackLanguageChanged,
  trackQuestionViewed,
  trackAnswerSelected,
  trackQuizPaused,
  trackQuizResumed,
  trackQuestionTimeout,
  trackFeedbackViewed,
  trackQuizCompleted,
  trackResultsViewed,
  trackQuizRestarted,
  getAnalyticsSummary,
};

export default analytics;
