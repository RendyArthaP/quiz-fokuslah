/* eslint-disable @typescript-eslint/no-explicit-any */
// Analytics Type Definitions
export interface AnalyticsEvent {
  event_name: string;
  properties: Record<string, any>;
  timestamp: Date;
  session_id: string;
  user_id?: string;
}

export interface QuizAnalyticsData {
  // Quiz Session Data
  session_id: string;
  language: "my" | "en";
  start_time: Date;
  end_time?: Date;
  total_duration?: number;

  // Performance Data
  total_questions: number;
  correct_answers: number;
  accuracy_rate: number;
  final_score: number;

  // Behavioral Data
  pause_count: number;
  total_pause_duration: number;
  language_switches: number;
  questions_timed_out: number;
}

export interface QuestionAnalyticsData {
  question_id: number;
  question_difficulty: "easy" | "medium" | "hard";
  selected_answer: number | null;
  correct_answer: number;
  is_correct: boolean;
  time_taken: number;
  time_remaining: number;
  was_paused: boolean;
  pause_duration?: number;
}

export interface UserInteractionEvent {
  event_type:
    | "quiz_started"
    | "question_viewed"
    | "answer_selected"
    | "quiz_paused"
    | "quiz_resumed"
    | "quiz_completed"
    | "language_changed"
    | "feedback_viewed"
    | "results_viewed"
    | "quiz_restarted";
  timestamp: Date;
  data: Record<string, any>;
}

// Analytics Provider Interface
export interface AnalyticsProvider {
  initialize(config: any): void;
  track(event: AnalyticsEvent): void;
  identify(userId: string, properties?: Record<string, any>): void;
  page(pageName: string, properties?: Record<string, any>): void;
}
