import { createMachine, assign, createActor } from 'xstate';

export const stateMachine = createMachine({
  states: {
    introduction: {
      on: {
        forward: {
          target: "question",
        },
      },
    },
    question: {
      on: {
        forward: {
          target: "questionResult",
        },
      },
    },
    questionResult: {
      on: {
        nextQuestion: {
          target: "question",
        },
        seeResults: {
          target: "finalResult",
        },
      },
    },
    finalResult: {
      on: {
        tryAgain: {
          target: "introduction",
        },
      },
    },
  },
  initial: "introduction",
})
