import { NavLink } from "solid-app-router";
import { For } from "solid-js";
import { routes } from "../../routes";

export default function AppNav() {
  const routeLinks = routes.map(({ title, path }) => ({ title, path }));

  return (
    <nav>
      <For each={routeLinks}>
        {({ title, path }) => <NavLink href={path}>{title}</NavLink>}
      </For>
    </nav>
  );
}
