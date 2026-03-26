import * as Quiz from "services/quiz/quiz";

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
        this.goToNextQuestion();
        break;
      case QuizManager.states.QUESTION:
        const [isValid, value] = this.isAnswerIDValid(event);
        if (isValid) {
          this.submitAnswer(value!);
        } else {
          this.doNotAdvance();
        };
        break;
      case QuizManager.states.QUESTION_RESULT:
        if (this.hasNextQuestion()) {
          this.goToNextQuestion();
        } else {
          this.goToFinalResult();
        };
        break;
      case QuizManager.states.FINAL_RESULT:
        this.doNotAdvance();
        break;
    };
  };

  currentPage() {
    switch (this.state) {
      case QuizManager.states.INTRODUCTION:
        break;
      case QuizManager.states.QUESTION:
        break;
      case QuizManager.states.QUESTION_RESULT:
        break;
      case QuizManager.states.FINAL_RESULT:
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

  private goToNextQuestion(): void {
    this.state = QuizManager.states.QUESTION;
  };

  private submitAnswer(value: string): void {
    this.givenAnswers.push(value);
    this.state = QuizManager.states.QUESTION_RESULT;
  };

  private goToFinalResult(): void {
    this.state = QuizManager.states.FINAL_RESULT;
  };

  private doNotAdvance(): void { };
};
