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

export type Message = {
  text: string;
};

export type FinalResultMessage = Message & {
  requiredPoints: number;
};

export type Quiz = {
  messages: {
    general: {
      introduction: Message;
      result: Message;
    };
    personalized: {
      result: FinalResultMessage[];
    };
  };
  questions: QuestionAnswerMapping[];
};
