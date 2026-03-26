export type Message = {
  text: string;
};

export type Answer = Message & {
  id: string;
}

export type Question = Message & {
  answers: Answer[];
  correctAnswerID: string;
};

export type FinalResultMessage = Message & {
  requiredPoints: number;
};

export type Quiz = {
  messages: {
    general: {
      introduction: Message;
      result: Message;
      button: Message;
    };
    personalized: {
      result: FinalResultMessage[];
    };
  };
  questions: Question[];
};
