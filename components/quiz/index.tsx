"use client";

import { useState } from "react";
import { Card, Heading, Text, Button, Table } from "@radix-ui/themes";

import { type Quiz } from "@/services/quiz/format";
import { QuizManager } from "@/services/quiz/manager";

export default function Quiz({ data }: { data: Quiz }) {
  const [manager, refreshManager] = useState(new QuizManager(data));
  const [page, setPage] = useState(manager.currentPage());

  function handleUserAction(event: unknown) {
    manager.advance(event);
    refreshManager(manager);
    setPage(manager.currentPage());
  };

  return (
    <Card>
      <Heading>{ page.title.text }</Heading>
      <Text>{page.paragraph.text}</Text>

      {page.answers?.map((answer) => (
        <Button key={answer.id} onClick={() => handleUserAction({ answer: answer.id })}>
          {answer.text}
        </Button>
      ))}

      {page.table && (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>{page.table.headers.questions.text}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{page.table.headers.correctAnswers.text}</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>{page.table.headers.givenAnswers.text}</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {page.table.rows.map((row, i) => (
              <Table.Row key={i}>
                <Table.Cell>{row.questions.text}</Table.Cell>
                <Table.Cell>{row.correctAnswers.text}</Table.Cell>
                <Table.Cell>{row.givenAnswers.text}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}


      {page.button && (
        <Button onClick={() => handleUserAction({})}>
          {page.button.text}
        </Button>
      )}
    </Card>
  );
};
