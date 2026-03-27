"use client";

import { createRoot } from "react-dom/client";
import Quiz from "@/components/quiz/index";
import QuizData from "@/data/quiz.json";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode!);

root.render(
  <Quiz data={QuizData}></Quiz>
);
