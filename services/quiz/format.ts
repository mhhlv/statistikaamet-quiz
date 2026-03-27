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

export type Result = Record<string, Message>;

export type Quiz = {
  title: Message;
  introduction: Message;
  questions: Question[];
  button: Message;
  result: {
    question: Result;
    final: Result;
  };
};
