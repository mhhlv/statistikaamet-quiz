"use client";

import { QuizManager } from "services/quiz/manager";

export type Props = {
  manager: QuizManager;
};

export default function Quiz(props: Props) {
  return (
    <section>
      <h1>{props.manager.title()}</h1>
    </section>
  );
};
