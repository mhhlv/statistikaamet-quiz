import { setup } from 'xstate';

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
  states: {
    "STATE.INTRODUCTION": {
      on: {
        "TRANSITION.FORWARD": { target: "STATE.QUESTION" },
      },
    },
    "STATE.QUESTION": {
      on: {
        "TRANSITION.FORWARD": { target: "QUESTION.RESULT" },
      },
    },
    "STATE.QUESTION_RESULT": {
      on: {
        "TRANSITION.FORWARD_TO_NEXT_QUESTION": { target: "STATE.QUESTION" },
        "TRANSITION.FORWARD_TO_RESULT": { target: "STATE.FINAL_RESULT" },
      },
    },
    "STATE.FINAL_RESULT": {
      on: {
        "TRANSITION.TRY_AGAIN": { target: "STATE.INTRODUCTION" },
      },
    },
  },
  initial: "STATE.INTROCUTION",
  context: ({ input }) => ({
    currentQuestion: 0,
    questionCount: input.questionCount,
  }),
})
