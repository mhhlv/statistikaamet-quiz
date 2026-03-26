import * as Format from "services/quiz/format";

export type QuizManagerResponse = {
  text: Format.Message[];
  answers?: Format.Answer[];
  button?: Format.Message;
};
