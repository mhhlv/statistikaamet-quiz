"use client";

import { useState } from "react";
import { type Quiz } from "services/quiz/format";
import { QuizManager } from "services/quiz/manager";

export default function Quiz({ data }: { data: Quiz }) {
  const manager = new QuizManager(data);
  const [page, setPage] = useState(manager.currentPage());

  function handleUserAction(event: unknown) {
    manager.advance(event);
    setPage(manager.currentPage());
  };

  return (
    <section>
      <h1>{ page.title.text }</h1>
      {
        page.text.map(
          (paragraph) => { return <p>{ paragraph.text }</p>; } 
        )
      }
      {
        page.answers?.map(
          (answer) => {
            return (
              <button id={ answer.id } onClick={() => handleUserAction({ answer: answer.id }) }>
                { answer.text }
              </button>
            )
          }
        )
      }
      {
        page.button
          ? <button onClick={ () => handleUserAction({}) }>
              { page.button?.text }
            </button>
          : null
      }
    </section>
  );
};
