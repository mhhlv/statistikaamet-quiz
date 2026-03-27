import * as Format from "services/quiz/format";

export type QuizManagerResponse = {
  title: Format.Message;
  text: Format.Message[];
  answers?: Format.Answer[];
  button?: Format.Message;
};
