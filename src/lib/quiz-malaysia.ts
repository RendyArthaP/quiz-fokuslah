import type { Question } from "@/types/quiz.type";

export const spmMathQuestionsMalay: Question[] = [
  {
    id: 1,
    question: "Jika 2x + 5 = 13, maka nilai x ialah...",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "2x + 5 = 13, maka 2x = 8, jadi x = 4",
    difficulty: "easy",
    motivationalText: "Wah hebat! Awak faham konsep persamaan linear!",
    statisticText:
      "Hanya 7 daripada 10 pelajar yang boleh jawab soalan ini dengan betul!",
  },
  {
    id: 2,
    question: "Luas segi tiga dengan tapak 8 cm dan tinggi 6 cm ialah...",
    options: ["24 cm²", "48 cm²", "14 cm²", "28 cm²"],
    correctAnswer: 0,
    explanation: "Luas segi tiga = ½ × tapak × tinggi = ½ × 8 × 6 = 24 cm²",
    difficulty: "easy",
    motivationalText: "Bagus! Formula luas segi tiga dah awak kuasai!",
    statisticText:
      "85% pelajar selalu keliru dengan formula ini, tapi awak tak!",
  },
  {
    id: 3,
    question: "Jika f(x) = 2x² - 3x + 1, maka f(2) = ...",
    options: ["3", "5", "7", "9"],
    correctAnswer: 0,
    explanation: "f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3",
    difficulty: "medium",
    motivationalText: "Terbaik! Penggantian fungsi kuadratik dah awak faham!",
    statisticText:
      "Soalan ini hanya boleh dijawab betul oleh 4 daripada 10 pelajar!",
  },
  {
    id: 4,
    question: "Kecerunan garis yang melalui titik (2,3) dan (5,9) ialah...",
    options: ["2", "3", "1/2", "3/2"],
    correctAnswer: 0,
    explanation: "Kecerunan = (y₂-y₁)/(x₂-x₁) = (9-3)/(5-2) = 6/3 = 2",
    difficulty: "medium",
    motivationalText: "Cemerlang! Konsep kecerunan dah awak kuasai!",
    statisticText:
      "Wow! Cuma 3 daripada 10 pelajar yang boleh kira kecerunan dengan tepat!",
  },
  {
    id: 5,
    question: "Nilai bagi log₂ 32 ialah...",
    options: ["4", "5", "6", "8"],
    correctAnswer: 1,
    explanation: "log₂ 32 = log₂ 2⁵ = 5",
    difficulty: "hard",
    motivationalText: "Luar biasa! Logaritma memang susah tapi awak boleh!",
    statisticText:
      "Hanya 2 daripada 10 pelajar yang faham logaritma sebaik ini!",
  },
];
