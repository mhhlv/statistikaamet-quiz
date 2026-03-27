"use client";

// @ts-expect-error "CSS file import"
import "@radix-ui/themes/styles.css";

// @ts-expect-error "font import"
import "@fontsource/roboto";

// @ts-expect-error "CSS file import"
import "@/pages/home/styles.css";

import { Theme } from "@radix-ui/themes";
import Quiz from "@/components/quiz/index";
import QuizData from "@/assets/quiz.json";

export default function Home() {
  return (
    <Theme accentColor="gray" grayColor="mauve" panelBackground="solid" radius="none">
      <Quiz data={QuizData}></Quiz>
    </Theme>
  );
};
