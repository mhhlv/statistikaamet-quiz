"use client";

import { createRoot } from "react-dom/client";
import Home from "@/pages/home";

const rootNode = document.getElementById("root");
const root = createRoot(rootNode!);

root.render(
  <Home></Home>
);
