import type * as Quiz from "./quiz";

export class QuizManager {
  quiz: Quiz.Quiz;


  constructor(quiz: Quiz.Quiz) {
    this.quiz = quiz;
  };

  introductionMessage(): string {
    return this.quiz.text.introduction;
  };

  conclusionMessage(): string {
    return this.quiz.text.conclusion;
  };
};
