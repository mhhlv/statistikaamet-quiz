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
        this.goToNextQuestion();
        break;
      case QuizManager.states.QUESTION:
        this.submitAnswer(event);
        break;
      case QuizManager.states.QUESTION_RESULT:
        if (this.hasNextQuestion()) {
          this.goToNextQuestion();
        } else {
          this.goToFinalResult();
        };
        break;
      case QuizManager.states.FINAL_RESULT:
        this.resetQuiz();
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

  private resetQuiz(): void {
    this.givenAnswers.length = 0;
    this.state = QuizManager.states.INTRODUCTION;
  };

  private goToNextQuestion(): void {
    this.state = QuizManager.states.QUESTION;
  };

  private submitAnswer(event: unknown): void {
    const [isValid, value] = this.isAnswerIDValid(event);
    if (isValid) {
      this.givenAnswers.push(value!);
      this.state = QuizManager.states.QUESTION_RESULT;
    };
  };

  private goToFinalResult(): void {
    this.state = QuizManager.states.FINAL_RESULT;
  };

};
