export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  motivationalText: string;
  statisticText: string;
  timeLimit: number; // dalam detik
}

export interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  score: number;
  isCompleted: boolean;
  startTime: Date;
  endTime?: Date;
  isPaused: boolean;
  timeRemaining: number; // waktu tersisa untuk soal saat ini
  pausedAt?: Date;
}
