export type ID = string;

export type Answer = {
  id: ID;
  text: string;
}

export type Question = {
  id: ID;
  text: string;
};

export type QuestionAnswerMapping = {
  question: Question;
  answers: Answer[];
  correctAnswerID: ID;
};

export type Quiz = {
  text: {
    introduction: string;
    conclusion: string;
  };
  questions: QuestionAnswerMapping[];
};
