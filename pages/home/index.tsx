"use client";

import Quiz from "components/quiz/index";
import QuizData from "data/quiz.json";

export default function Home() {
  return (
    <html>
      <body>
        <Quiz data={ QuizData }></Quiz>
      </body>
    </html>
  );
};
