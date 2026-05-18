import { NavLink } from "react-router";
import { Outlet } from "react-router";
import { Page } from "../components/layout/page";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { Text } from "@/components/ui/text";

function MiniProjectsDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Page>
      <div>
        {location.pathname !== "/mini-projects" && (
          <button
            className="text-fs-sm text-secondary-foreground underline"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        )}
      </div>
      <Text as="h1" className="text-fs-lg font-semibold text-primary">
        Mini projects
      </Text>
      <div>
        <ul className="flex gap-2 text-fs-sm">
          <li>
            <NavLink
              to="task-manager"
              className={({ isActive }) =>
                ` ${isActive && "font-bold underline"}`
              }
            >
              Task Manager
            </NavLink>
          </li>
          <li>
            <NavLink
              to="multi-step-form"
              className={({ isActive }) =>
                ` ${isActive && "font-bold underline"}`
              }
            >
              Form Wizard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="modal-dialog"
              className={({ isActive }) =>
                ` ${isActive && "font-bold underline"}`
              }
            >
              Modal Dialog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="ux-lag"
              className={({ isActive }) =>
                ` ${isActive && "font-bold underline"}`
              }
            >
              UX Lag
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </Page>
  );
}

export default MiniProjectsDashboard;
