import type { ComponentPropsWithRef } from "react";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <header className="w-full p-4 flex items-center">
      <div>
        <NavLink to="/">
          <p className="text-fs-lg font-bold text-primary">Frontend Lab</p>
        </NavLink>
      </div>
      <nav className="ml-auto">
        <NavItem itemName="Mini projects" to="/mini-projects" />
      </nav>
    </header>
  );
}

type NavItemProps = {
  itemName: string;
} & ComponentPropsWithRef<typeof NavLink>;
function NavItem(props: NavItemProps) {
  return (
    <NavLink to={props.to}>
      <p className="text-fs-sm font-semibold text-secondary-foreground">
        {props.itemName}
      </p>
    </NavLink>
  );
}

export { Navbar };
