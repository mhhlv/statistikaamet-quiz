export type Answer = {
  text: string;
}

export type Question = {
  text: string;
};

export type QuestionAnswerMapping = {
  question: Question;
  answers: Answer[];
  correctAnswer: Answer;
};

