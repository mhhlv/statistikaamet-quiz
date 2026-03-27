import * as Format from "@/services/quiz/format";

export type QuizManagerResponse = {
  title: Format.Message;
  paragraph: Format.Message;
  answers?: Format.Answer[];
  button?: Format.Message;
  table?: {
    headers: {
      questions: Format.Message;
      correctAnswers: Format.Message;
      givenAnswers: Format.Message;
    };
    rows: {
      questions: Format.Message;
      correctAnswers: Format.Message;
      givenAnswers: Format.Message;
    }[];
  };
};
