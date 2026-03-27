"use client";

import { useState } from "react";
import { type Quiz } from "services/quiz/format";
import { QuizManager } from "services/quiz/manager";

export default function Quiz({ data }: { data: Quiz }) {
  const [manager, refreshManager] = useState(new QuizManager(data));
  const [page, setPage] = useState(manager.currentPage());

  function handleUserAction(event: unknown) {
    manager.advance(event);
    refreshManager(manager);
    setPage(manager.currentPage());
  };

  return (
    <section>
      <h1>{ page.title.text }</h1>
      <p>{page.paragraph.text}</p>
      {
        page.answers?.map(
          answer => (
            <button onClick={() => handleUserAction({ answer: answer.id }) }>
              { answer.text }
            </button>
          )
        )
      }
      {
        page.table
          ? <table>
              <tr>
                <th>{ page.table.headers.questions.text }</th>
                <th>{ page.table.headers.correctAnswers.text }</th>
                <th>{ page.table.headers.givenAnswers.text }</th>
              </tr>
              {
                page.table.rows.map(
                  row => (
                    <tr>
                      <th>{row.questions.text}</th>
                      <th>{row.correctAnswers.text}</th>
                      <th>{row.givenAnswers.text}</th>
                    </tr>
                  )
                )
              }
            </table>
          : null
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
