"use client";

import { Trophy, Target, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useQuizContext } from "@/context/QuizContext";
import { useRouter } from "next/navigation";

const ResultsPage = () => {
  const router = useRouter();
  const { quizState, getQuestions, currentLanguage, resetQuiz } =
    useQuizContext();
  const questions = getQuestions();

  const percentage = Math.round((quizState.score / questions.length) * 100);
  const timeTaken =
    quizState.endTime && quizState.startTime
      ? Math.round(
          (quizState.endTime.getTime() - quizState.startTime.getTime()) / 1000
        )
      : 0;

  const content = {
    my: {
      excellent: {
        title: "Luar Biasa!",
        message: "Awak ada potensi besar dalam Matematik!",
      },
      good: {
        title: "Bagus Sangat!",
        message: "Dengan sedikit latihan lagi, awak boleh jadi yang terbaik!",
      },
      keepTrying: {
        title: "Terus Berusaha!",
        message: "Setiap pakar pernah jadi pemula. Jom tingkatkan lagi!",
      },
      stats: { correct: "Betul", accuracy: "Ketepatan", time: "Masa" },
      analysis: {
        title: "Analisis Keupayaan Awak",
        subjects: {
          algebra: "Algebra & Persamaan",
          geometry: "Geometri & Pengukuran",
          functions: "Fungsi & Graf",
        },
        levels: {
          good: "Bagus",
          needPractice: "Perlu Latihan",
          excellent: "Cemerlang",
          fair: "Cukup Baik",
          master: "Tahap Master",
          keepLearning: "Terus Belajar",
        },
      },
      cta: {
        title: "Nak Tingkatkan Keupayaan Awak?",
        description:
          "Sertai ribuan pelajar lain yang dah tingkatkan markah Matematik mereka sehingga 40%!",
        startLearning: "Mula Belajar Sekarang",
        tryAgain: "Cuba Lagi",
      },
    },
    en: {
      excellent: {
        title: "Outstanding!",
        message: "You have great potential in Mathematics!",
      },
      good: {
        title: "Great Job!",
        message: "With a little more practice, you can be the best!",
      },
      keepTrying: {
        title: "Keep Fighting!",
        message: "Every expert was once a beginner. Let's improve more!",
      },
      stats: { correct: "Correct", accuracy: "Accuracy", time: "Time" },
      analysis: {
        title: "Your Ability Analysis",
        subjects: {
          algebra: "Algebra & Equations",
          geometry: "Geometry & Measurement",
          functions: "Functions & Graphs",
        },
        levels: {
          good: "Good",
          needPractice: "Need Practice",
          excellent: "Excellent",
          fair: "Fair",
          master: "Master Level",
          keepLearning: "Keep Learning",
        },
      },
      cta: {
        title: "Want to Improve Your Skills?",
        description:
          "Join thousands of other students who have improved their Math scores by up to 40%!",
        startLearning: "Start Learning Now",
        tryAgain: "Try Again",
      },
    },
  };

  const text = content[currentLanguage];

  const getPerformanceMessage = () => {
    if (percentage >= 80)
      return {
        title: text.excellent.title,
        message: text.excellent.message,
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200",
      };
    if (percentage >= 60)
      return {
        title: text.good.title,
        message: text.good.message,
        color: "text-blue-600",
        bgColor: "bg-blue-50 border-blue-200",
      };
    return {
      title: text.keepTrying.title,
      message: text.keepTrying.message,
      color: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200",
    };
  };

  const performance = getPerformanceMessage();

  const onRestart = () => {
    router.push("/");
    // Reset quiz state
    resetQuiz();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Results */}
      <div
        className={`${performance.bgColor} border rounded-xl p-6 text-center`}
      >
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${performance.color}`} />
        <h1 className={`text-3xl font-bold mb-2 ${performance.color}`}>
          {performance.title}
        </h1>
        <p className="text-lg text-gray-700 mb-4">{performance.message}</p>

        <div className="flex justify-center items-center gap-8 mt-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${performance.color}`}>
              {quizState.score}/{questions.length}
            </div>
            <div className="text-sm text-gray-600">{text.stats.correct}</div>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${performance.color}`}>
              {percentage}%
            </div>
            <div className="text-sm text-gray-600">{text.stats.accuracy}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md border">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {quizState.score}
              </div>
              <div className="text-sm text-gray-600">{text.stats.correct}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md border">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {timeTaken}s
              </div>
              <div className="text-sm text-gray-600">{text.stats.time}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md border">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">{text.stats.accuracy}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Analytics */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            {text.analysis.title}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <span className="font-medium text-gray-700">
              {text.analysis.subjects.algebra}
            </span>
            <span
              className={`font-bold px-3 py-1 rounded-full text-sm ${
                percentage >= 60
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {percentage >= 60
                ? text.analysis.levels.good
                : text.analysis.levels.needPractice}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <span className="font-medium text-gray-700">
              {text.analysis.subjects.geometry}
            </span>
            <span
              className={`font-bold px-3 py-1 rounded-full text-sm ${
                percentage >= 70
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {percentage >= 70
                ? text.analysis.levels.excellent
                : text.analysis.levels.fair}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <span className="font-medium text-gray-700">
              {text.analysis.subjects.functions}
            </span>
            <span
              className={`font-bold px-3 py-1 rounded-full text-sm ${
                percentage >= 80
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {percentage >= 80
                ? text.analysis.levels.master
                : text.analysis.levels.keepLearning}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {text.cta.title}
        </h3>
        <p className="text-gray-600 mb-4">{text.cta.description}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-gradient-to-r bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer hover:bg-orange-500 transition-all duration-200 flex items-center justify-center gap-2">
            {text.cta.startLearning}
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onRestart}
            className="flex-1 border-2 border-orange-400 text-orange-400 font-semibold py-3 px-6 rounded-lg cursor-pointer transition-all duration-200"
          >
            {text.cta.tryAgain}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResultsPage;
