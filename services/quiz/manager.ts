import type * as Quiz from "./types";

export class QuizManager {
  quiz: Quiz.Quiz;
  state: (typeof QuizManager.states)[keyof typeof QuizManager.states];
  currentQuestion: number;

  private static states = {
    INTRODUCTION: "INTRODUCTION",
    QUESTION: "QUESTION",
    QUESTION_RESULT: "QUESTION_RESULT",
    FINAL_RESULT: "FINAL_RESULT",
  } as const;

  constructor(quiz: Quiz.Quiz) {
    this.quiz = quiz;
    this.state = QuizManager.states.INTRODUCTION;
    this.currentQuestion = 0;
  };

  private transition(): void {
    switch (this.state) {
      case QuizManager.states.INTRODUCTION:
        this.state = QuizManager.states.QUESTION;
        break;
      case QuizManager.states.QUESTION:
        this.state = QuizManager.states.QUESTION_RESULT;
        break;
      case QuizManager.states.QUESTION_RESULT:
        if (this.currentQuestion < this.quiz.questions.length - 1) {
          this.state = QuizManager.states.QUESTION;
          this.currentQuestion++;
        } else {
          this.state = QuizManager.states.FINAL_RESULT;
        };
        break;
      case QuizManager.states.FINAL_RESULT:
        this.state = QuizManager.states.INTRODUCTION;
        this.currentQuestion = 0;
        break;
    };
  };

};
