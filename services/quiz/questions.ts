export type Answer = {
  text: string;
}

export type Question = {
  text: string;
  answers: Answer[];
  correctAnswer: Answer;
};
