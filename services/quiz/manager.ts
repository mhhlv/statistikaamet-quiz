import type { Answer, Question } from "./questions";

type QuizManager = {
  chosenAswers: Map<Question, Answer|undefined>;
};

export function createQuizManager(quiz: Question[]): QuizManager {
  return {
    chosenAswers: new Map(
      quiz.map((q: Question) => [q, undefined])
    )
  };
};
