export type ID = string;

export type Message = {
  text: string;
};

export type Answer = Message & {
  id: ID;
}

export type Question = Message & {
  answers: Answer[];
  correctAnswerID: ID;
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
  questions: Question[];
};
