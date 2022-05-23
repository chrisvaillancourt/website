import { useRoutes } from "solid-app-router";
import { routes } from "../routes";
import { PageHeading } from "./PageHeading";
import AppNav from "./AppNav";

export default function App() {
  const Routes = useRoutes(routes);
  return (
    <>
      <AppNav />
      <PageHeading />
      <Routes />
    </>
  );
}
