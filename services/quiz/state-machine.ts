import { createMachine, assign, createActor } from 'xstate';

export const stateMachine = createMachine({
  states: {
    introduction: {},
    question: {},
    questionResult: {},
    finalResult: {},
  },
  initial: "introduction",
})
