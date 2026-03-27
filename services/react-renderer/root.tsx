"use client";

// @ts-expect-error "CSS file import"
import "@radix-ui/themes/styles.css";

import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";

import Quiz from "@/components/quiz/index";
import QuizData from "@/assets/quiz.json";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode!);

root.render(
  <Theme>
    <Quiz data={QuizData}></Quiz>
  </Theme>
);
