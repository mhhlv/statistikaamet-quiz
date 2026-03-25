import type * as Quiz from "./types";
import { stateMachine } from "./state-machine";
import { type Actor, createActor } from "xstate";

export class QuizManager {
  quiz: Quiz.Quiz;
  state: Actor<typeof stateMachine>;

  constructor(quiz: Quiz.Quiz) {
    this.quiz = quiz;
    this.state = createActor(stateMachine, {input: {questionCount: quiz.questions.length}});
  };

};
