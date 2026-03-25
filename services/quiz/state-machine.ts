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
        "TRANSITION.TO_NEXT_QUESTION": { target: "STATE.QUESTION" },
        "TRANSITION.TO_FINAL_RESULT": { target: "STATE.FINAL_RESULT" },
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
