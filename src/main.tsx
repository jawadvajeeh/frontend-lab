import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter, Routes, Route } from "react-router";
import MiniProjectsDashboard from "./mini-projects/index.tsx";
import { AppShell } from "./components/layout/app-shell.tsx";
import { TaskManager } from "./mini-projects/task-manager";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<App />} />
          <Route path="/mini-projects" element={<MiniProjectsDashboard />}>
            <Route path="task-manager" element={<TaskManager />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
