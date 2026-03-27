"use client";

import Quiz from "@/components/quiz/index";
import QuizData from "@/data/quiz.json";

export default function Home() {
  return (
    <Quiz data={ QuizData }></Quiz>
  );
};
