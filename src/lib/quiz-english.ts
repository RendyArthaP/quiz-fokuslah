import type { Question } from "@/types/quiz.type";

export const spmMathQuestionsEnglish: Question[] = [
  {
    id: 1,
    question: "If 2x + 5 = 13, then the value of x is...",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "2x + 5 = 13, so 2x = 8, therefore x = 4",
    difficulty: "easy",
    motivationalText: "Awesome! You understand linear equations perfectly!",
    statisticText:
      "Only 7 out of 10 students can answer this question correctly!",
    timeLimit: 0,
  },
  {
    id: 2,
    question: "The area of a triangle with base 8 cm and height 6 cm is...",
    options: ["24 cm²", "48 cm²", "14 cm²", "28 cm²"],
    correctAnswer: 0,
    explanation: "Area of triangle = ½ × base × height = ½ × 8 × 6 = 24 cm²",
    difficulty: "easy",
    motivationalText: "Great! You've mastered the triangle area formula!",
    statisticText:
      "85% of students often get confused with this formula, but not you!",
    timeLimit: 0,
  },
  {
    id: 3,
    question: "If f(x) = 2x² - 3x + 1, then f(2) = ...",
    options: ["3", "5", "7", "9"],
    correctAnswer: 0,
    explanation: "f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3",
    difficulty: "medium",
    motivationalText:
      "Excellent! You understand quadratic function substitution!",
    statisticText:
      "This question can only be answered correctly by 4 out of 10 students!",
    timeLimit: 0,
  },
  {
    id: 4,
    question:
      "The gradient of the line passing through points (2,3) and (5,9) is...",
    options: ["2", "3", "1/2", "3/2"],
    correctAnswer: 0,
    explanation: "Gradient = (y₂-y₁)/(x₂-x₁) = (9-3)/(5-2) = 6/3 = 2",
    difficulty: "medium",
    motivationalText: "Amazing! You've mastered the gradient concept!",
    statisticText:
      "Wow! Only 3 out of 10 students can calculate gradient accurately!",
    timeLimit: 0,
  },
  {
    id: 5,
    question: "The value of log₂ 32 is...",
    options: ["4", "5", "6", "8"],
    correctAnswer: 1,
    explanation: "log₂ 32 = log₂ 2⁵ = 5",
    difficulty: "hard",
    motivationalText: "Outstanding! Logarithms are tricky but you nailed it!",
    statisticText: "Only 2 out of 10 students understand logarithms this well!",
    timeLimit: 0,
  },
];
