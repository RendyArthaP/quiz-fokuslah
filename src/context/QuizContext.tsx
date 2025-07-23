"use client";

import React, { FC, PropsWithChildren } from "react";

export type Languange = "my" | "eng";

type StepQuiz = 1 | 2 | 3 | 4 | 5;

interface QuizContextStateProps {
  languange: Languange;
  stepQuiz: StepQuiz;
}

interface QuizContextFunctionProps {
  setLanguange: (languange: Languange) => void;
  setStepQuiz: (stepQuiz: StepQuiz) => void;
}

const State = React.createContext<QuizContextStateProps | undefined>(undefined);
const Function = React.createContext<QuizContextFunctionProps | undefined>(
  undefined
);

const QuizContext: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [languange, setLanguange] = React.useState<Languange>("my");
  const [stepQuiz, setStepQuiz] = React.useState<StepQuiz>(1);

  return (
    <State.Provider value={{ languange, stepQuiz }}>
      <Function.Provider value={{ setLanguange, setStepQuiz }}>
        {children}
      </Function.Provider>
    </State.Provider>
  );
};

export default QuizContext;

export const useQuizContextState = () => {
  const context = React.useContext(State);
  if (!context) {
    throw new Error("useQuizContextState must be used within a QuizContext");
  }
  return context;
};

export const useQuizContextFunction = () => {
  const context = React.useContext(Function);
  if (!context) {
    throw new Error("useQuizContextFunction must be used within a QuizContext");
  }
  return context;
};
