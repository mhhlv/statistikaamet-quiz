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

export type QuestionResult = Map<boolean, Message[]>;
export type FinalResult = Map<number, Message[]>;

export type Quiz = {
  title: Message;
  introduction: Message[];
  questions: Question[];
  button: Message;
  result: {
    question: QuestionResult;
    final: FinalResult;
  };
};
