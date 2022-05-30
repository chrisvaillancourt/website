import { useRoutes } from "solid-app-router";
import { routes } from "../../routes";
import AppNav from "../AppNav/AppNav";

import "./App.css";

export default function App() {
  const Routes = useRoutes(routes);
  return (
    <>
      <AppNav />
      <Routes />
    </>
  );
}
