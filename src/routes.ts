import { lazy } from "solid-js";

const routes = [
  {
    title: "Chris Vaillancourt",
    path: "/",
  },
  {
    title: "Posts",
    path: "/posts",
    component: lazy(() => import("./pages/Posts")),
  },
  {
    title: "About",
    path: "/about",
    component: lazy(() => import("./pages/About")),
  },
  {
    title: "Contact",
    path: "/contact",
    component: lazy(() => import("./pages/Contact")),
  },
];

export { routes };
