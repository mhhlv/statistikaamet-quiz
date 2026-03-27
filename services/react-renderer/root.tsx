"use client";

// @ts-expect-error "CSS file import"
import "@radix-ui/themes/styles.css";

// @ts-expect-error "font import"
import "@fontsource/roboto";

// @ts-expect-error "CSS file import"
import "@/services/react-renderer/styles.css";

import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";

import Quiz from "@/components/quiz/index";
import QuizData from "@/assets/quiz.json";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode!);

root.render(
  <Theme
    accentColor="gray"
    grayColor="mauve"
    panelBackground="solid"
    radius="none"
  >
    <Quiz data={QuizData}></Quiz>
  </Theme>
);
