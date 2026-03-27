import * as Format from "services/quiz/format";
import type * as Response from "services/quiz/response";

export class QuizManager {
  private quiz: Format.Quiz;
  private state: (typeof QuizManager.states)[keyof typeof QuizManager.states];
  private givenAnswers: string[];
  private correctAnswers: boolean[];

  private static states = {
    INTRODUCTION: "INTRODUCTION",
    QUESTION: "QUESTION",
    QUESTION_RESULT: "QUESTION_RESULT",
    FINAL_RESULT: "FINAL_RESULT",
  } as const;

  constructor(quiz: Format.Quiz) {
    this.quiz = quiz;
    this.state = QuizManager.states.INTRODUCTION;
    this.givenAnswers = [];
    this.correctAnswers = [];
  };

  advance(event: unknown): void {
    switch (this.state) {
      case QuizManager.states.INTRODUCTION:
        this.handleAdvanceFromIntroduction(event);
        break;
      case QuizManager.states.QUESTION:
        this.handleAdvanceFromQuestion(event);
        break;
      case QuizManager.states.QUESTION_RESULT:
        this.handleAdvanceFromQuestionResult(event);
        break;
      case QuizManager.states.FINAL_RESULT:
        this.handleAdvanceFromFinalResult(event);
        break;
    };
  };

  currentPage(): Response.QuizManagerResponse {
    switch (this.state) {
      case QuizManager.states.INTRODUCTION:
        return this.displayIntroduction();
      case QuizManager.states.QUESTION:
        return this.displayCurrentQuestion();
      case QuizManager.states.QUESTION_RESULT:
        return this.displayQuestionResult();
      case QuizManager.states.FINAL_RESULT:
        return this.displayFinalResult();
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleAdvanceFromIntroduction(_event: unknown): void {
    if (this.hasNextQuestion()) {
      this.state = QuizManager.states.QUESTION;
    } else {
      this.state = QuizManager.states.FINAL_RESULT;
    };
  };

  private handleAdvanceFromQuestion(event: unknown): void {
    const [isValid, value] = this.isAnswerIDValid(event);
    if (isValid) {
      this.submitAnswer(value!);
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleAdvanceFromQuestionResult(_event: unknown): void {
    if (this.hasNextQuestion()) {
      this.state = QuizManager.states.QUESTION;
    } else {
      this.state = QuizManager.states.FINAL_RESULT;
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleAdvanceFromFinalResult(_event: unknown): void {};

  private isAnswerIDValid(event: unknown): [boolean, string?] {
    const answer = (event as Record<string, string>)["answer"];

    const validAnswerIDs = this.quiz.questions[this.givenAnswers.length]!.answers.flatMap(
      (answer) => { return answer.id; }
    );

    if (answer && answer in validAnswerIDs) {
      return [true, answer];
    }

    return [false];
  };

  private hasNextQuestion(): boolean {
    if (this.givenAnswers.length < this.quiz.questions.length) {
      return true;
    };

    return false;
  };

  private submitAnswer(value: string): void {
    if (value === this.quiz.questions[this.givenAnswers.length]!.correctAnswerID) {
      this.correctAnswers.push(true);
    } else {
      this.correctAnswers.push(false);
    };

    this.givenAnswers.push(value);
    this.state = QuizManager.states.QUESTION_RESULT;
  };

  private displayIntroduction(): Response.QuizManagerResponse {
    return {
      title: this.quiz.title,
      text: this.quiz.introduction,
      button: this.quiz.button
    };
  };

  private displayCurrentQuestion(): Response.QuizManagerResponse {
    return {
      title: this.quiz.title,
      text: [this.quiz.questions[this.givenAnswers.length] as Format.Message],
      answers: this.quiz.questions[this.givenAnswers.length]!.answers
    };
  };

  private displayQuestionResult(): Response.QuizManagerResponse {
    let text = this.quiz.result.question.get(false)!;
    if (this.correctAnswers.at(-1) === true) {
      text = this.quiz.result.question.get(true)!;
    };

    return {
      title: this.quiz.title,
      text: text,
      button: this.quiz.button
    };
  };

  private displayFinalResult(): Response.QuizManagerResponse {
    let correctAnswerCount = 0;
    for (const answer of this.correctAnswers) {
      if (answer === true) { correctAnswerCount++; };
    };

    const text = this.quiz.result.final.get(correctAnswerCount)!;
    return {
      title: this.quiz.title,
      text: text
    };
  };
};
