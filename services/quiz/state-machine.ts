import { assign, setup } from 'xstate';

export const stateMachine = setup({
  types: {
    context: {} as {
      currentQuestion: number,
      questionCount: number,
    },
    input: {} as {
      questionCount: number,
    },
  },
}).createMachine({
  initial: "STATE.INTRODUCTION",
  context: ({ input }) => ({
    currentQuestion: 0,
    questionCount: input.questionCount,
  }),
  states: {
    "STATE.INTRODUCTION": {
      on: {
        "TRANSITION.TO_FIRST_QUESTION": { target: "STATE.QUESTION" },
      },
    },
    "STATE.QUESTION": {
      on: {
        "TRANSITION.CHOOSE_ANSWER": { target: "QUESTION.RESULT" },
      },
    },
    "STATE.QUESTION_RESULT": {
      on: {
        "TRANSITION.TO_NEXT_QUESTION": {
          guard: ({ context }) => { return context.currentQuestion < context.questionCount - 1; },
          actions: assign({ currentQuestion: ({ context }) => {return context.currentQuestion + 1; } }),
          target: "STATE.QUESTION",
        },
        "TRANSITION.TO_FINAL_RESULT": {
          guard: ({ context }) => { return context.currentQuestion >= context.questionCount - 1; }, 
          target: "STATE.FINAL_RESULT",
        },
      },
    },
    "STATE.FINAL_RESULT": {
      on: {
        "TRANSITION.TRY_AGAIN": {
          actions: assign({ currentQuestion: 0 }),
          target: "STATE.INTRODUCTION",
        },
      },
    },
  },
})
