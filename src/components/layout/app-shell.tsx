import { Outlet } from "react-router";
import { Navbar } from "./nav-bar";

function AppShell() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export { AppShell };
