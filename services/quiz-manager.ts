export type Answer = {
  text: string;
}

export type Question = {
  text: string;
  answers: Answer[];
  correctAnswer: Answer;
};

export type Quiz = {
  questions: Question[];
};

type QuizManager = {
  chosenAswers: Map<Question, Answer|undefined>;
};

export function createQuizManager(quiz: Quiz): QuizManager {
  return {
    chosenAswers: new Map(
      quiz.questions.map((q: Question) => [q, undefined])
    )
  };
};
