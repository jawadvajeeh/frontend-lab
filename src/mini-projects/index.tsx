import { NavLink } from "react-router";
import { Outlet } from "react-router";
import { Page } from "../components/layout/page";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

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
      <h1 className="text-fs-xl font-semibold text-primary">Mini projects</h1>
      <div>
        <ul>
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
        </ul>
      </div>
      <Outlet />
    </Page>
  );
}

export default MiniProjectsDashboard;
