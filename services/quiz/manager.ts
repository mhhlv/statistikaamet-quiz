import type * as Quiz from "./quiz";

export class QuizManager {
  quiz: Quiz.Quiz;
  state: (typeof QuizManager.states)[keyof typeof QuizManager.states];
  givenAnswers: Quiz.ID[];

  constructor(quiz: Quiz.Quiz) {
    this.quiz = quiz;
    this.state = QuizManager.states.INTRODUCTION;
    this.givenAnswers = [];
  };

  private static states = {
    INTRODUCTION: "INTRODUCTION",
    QUESTION: "QUESTION",
    QUESTION_RESULT: "QUESTION_RESULT",
    FINAL_RESULT: "FINAL_RESULT",
  } as const;

  private transition(): void {
    switch (this.state) {
      case QuizManager.states.INTRODUCTION:
        this.state = QuizManager.states.QUESTION;
        break;
      case QuizManager.states.QUESTION:
        this.state = QuizManager.states.QUESTION_RESULT;
        break;
      case QuizManager.states.QUESTION_RESULT:
        if (this.givenAnswers.length < this.quiz.questions.length) {
          this.state = QuizManager.states.QUESTION;
        } else {
          this.state = QuizManager.states.FINAL_RESULT;
        };
        break;
      case QuizManager.states.FINAL_RESULT:
        this.state = QuizManager.states.INTRODUCTION;
        this.givenAnswers.length = 0;
        break;
    };
  };

};
