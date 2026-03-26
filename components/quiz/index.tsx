"use client";

import { QuizManager } from "services/quiz/manager";

export type Props = {
  manager: QuizManager;
};

export default function Quiz(props: Props) {
  return (
    <section>
      <h1>{ props.manager.title() }</h1>
      {
        props.manager.currentPage().text.map(
          (paragraph) => { return <p>{ paragraph.text }</p>; } 
        )
      }
      {
        props.manager.currentPage().answers?.map(
          (answer) => { return <button id={ answer.id }>{ answer.text }</button> }
        )
      }
      {
        props.manager.currentPage().button
          ? <button>{ props.manager.currentPage().button?.text }</button>
          : null
      }
    </section>
  );
};
