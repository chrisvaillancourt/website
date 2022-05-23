import { useRoutes } from "solid-app-router";
import { routes } from "./routes";
import { PageHeading } from "./components/PageHeading";
import AppNav from "./components/AppNav";

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
