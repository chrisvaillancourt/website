import { useRoutes } from "solid-app-router";
import { routes } from "../routes";
import { PageHeading } from "./PageHeading";
import AppNav from "./AppNav";
import "open-props/normalize";

import { themeClass, exampleStyle } from "../styles/styles.css";

export default function App() {
  const Routes = useRoutes(routes);
  return (
    <div class={themeClass}>
      <AppNav />
      <PageHeading />
      <Routes />
    </div>
  );
}
