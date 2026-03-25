import type * as Quiz from "./types";

export class QuizManager {
  quiz: Quiz.Quiz;

  constructor(quiz: Quiz.Quiz) {
    this.quiz = quiz;
  };

};
