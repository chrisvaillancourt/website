import { lazy } from "solid-js";

const routes = [
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
  },
];

export { routes };
