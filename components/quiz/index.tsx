"use client";

import { useState } from "react";
import { Heading, Text, Button, Table, Section, Grid, Container, Flex, Card } from "@radix-ui/themes";

import { type Quiz } from "@/services/quiz/format";
import { QuizManager } from "@/services/quiz/manager";

export default function Quiz({ data }: { data: Quiz }) {
  const [[manager, tick], setTick] = useState([new QuizManager(data), 0]);
  const page = manager.currentPage();

  const handleUserAction = (payload: object = {}) => {
    manager.advance(payload);
    setTick([manager, tick + 1]);
  };

  return (
    <Container size="3">
      <Card>
        <Flex height="90vh" direction="column">
          <Section py="3">
            <Heading>{page.title.text}</Heading>
          </Section>

          <Section py="3">
            <Text>{page.paragraph.text}</Text>
          </Section>

          {page.answers && (
            <Section py="5">
              <Grid columns="1" gap="2">
                {page.answers.map((answer) => (
                  <Button
                    variant="solid"
                    size="3"
                    // @ts-expect-error "LSP does not recognize highContrast attribute"
                    highContrast
                    key={answer.id}
                    onClick={() => handleUserAction({ answer: answer.id })}
                  >
                    {answer.text}
                  </Button>
                ))}
              </Grid>
            </Section>
          )}

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
            <Button
              mt="auto"
              mb="3"
              variant="solid"
              // @ts-expect-error "LSP does not recognize highContrast attribute"
              highContrast
              onClick={() => handleUserAction({})}>
              {page.button.text}
            </Button>
          )}
        </Flex>
      </Card>
    </Container>
  );
};
