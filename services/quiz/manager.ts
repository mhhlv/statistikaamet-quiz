import type { QuestionAnswerMapping, Answer } from "./questions";

type QuizManager = {
  quiz: QuestionAnswerMapping[];
  chosenAnswers: Answer[];
  currentQuestion: Iterator<QuestionAnswerMapping>; 
};

export function createQuizManager(questions: QuestionAnswerMapping[]): QuizManager {
  return {
    quiz: questions,
    chosenAnswers: [],
    currentQuestion: questions.values()
  };
};

export function hasNextQuestion(quiz: QuizManager): boolean {
  return false;
};
