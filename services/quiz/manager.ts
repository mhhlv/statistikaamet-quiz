import * as Quiz from "./quiz";

export class QuizManager {
  quiz: Quiz.Quiz;
  state: (typeof QuizManager.states)[keyof typeof QuizManager.states];
  givenAnswers: string[];

  constructor(quiz: Quiz.Quiz) {
    this.quiz = quiz;
    this.state = QuizManager.states.INTRODUCTION;
    this.givenAnswers = [];
  };

  advance(event: unknown): void {
    switch (this.state) {
      case QuizManager.states.INTRODUCTION:
        this.state = QuizManager.states.QUESTION;
        break;
      case QuizManager.states.QUESTION:
        const [isValid, value] = this.isAnswerIDValid(event);
        if (isValid) {
          this.givenAnswers.push(value!);
          this.state = QuizManager.states.QUESTION_RESULT;
        };
        break;
      case QuizManager.states.QUESTION_RESULT:
        if (this.givenAnswers.length < this.quiz.questions.length) {
          this.state = QuizManager.states.QUESTION;
        } else {
          this.state = QuizManager.states.FINAL_RESULT;
        };
        break;
      case QuizManager.states.FINAL_RESULT:
        this.givenAnswers.length = 0;
        this.state = QuizManager.states.INTRODUCTION;
        break;
    };
  };

  private static states = {
    INTRODUCTION: "INTRODUCTION",
    QUESTION: "QUESTION",
    QUESTION_RESULT: "QUESTION_RESULT",
    FINAL_RESULT: "FINAL_RESULT",
  } as const;

  private isAnswerIDValid(event: unknown): [boolean, string?] {
    const validAnswerIDs = this.quiz.questions[this.givenAnswers.length]!.answers.flatMap(
      (answer) => { return answer.id; }
    );

    const answer = (event as Record<string, string>)["answer"];
    if (answer && answer in validAnswerIDs) {
      return [true, answer];
    }

    return [false];
  };

};
