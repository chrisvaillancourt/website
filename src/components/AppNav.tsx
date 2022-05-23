import { NavLink } from "solid-app-router";
import { For } from "solid-js";
import { routes } from "../routes";

export default function AppNav() {
  const routeLinks = routes.map(({ title, path }) => ({ title, path }));

  const styles = {
    "padding-right": "10px",
  };
  return (
    <nav>
      <For each={routeLinks}>
        {({ title, path }) => (
          <NavLink style={styles} href={path}>
            {title}
          </NavLink>
        )}
      </For>
    </nav>
  );
}
