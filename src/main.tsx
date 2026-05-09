import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter, Routes, Route } from "react-router";
import MiniProjectsDashboard from "./mini-projects/index.tsx";
import { AppShell } from "./components/layout/app-shell.tsx";
import { TaskManager } from "./mini-projects/task-manager";
import { MSFWApp } from "./mini-projects/multi-step-form/index.tsx";
// import DashboardPage from "./playground/lazy-load-exercise/dashboard.tsx";

const Dashbord = lazy(
  () => import("./playground/lazy-load-exercise/dashboard.tsx"),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<App />} />
          <Route path="/mini-projects" element={<MiniProjectsDashboard />}>
            <Route path="task-manager" element={<TaskManager />} />
            <Route path="multi-step-form" element={<MSFWApp />} />
          </Route>
        </Route>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashbord />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
