import { lazy } from "solid-js";

const routes = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
    component: lazy(() => import("./pages/about")),
  },
];

export { routes };
