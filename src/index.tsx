import { render } from "solid-js/web";

import { PageHeading } from "./components/PageHeading";
import AppNav from "./components/AppNav";
render(
  () => (
    <>
      <AppNav />
      <PageHeading />
    </>
  ),
  document.getElementById("root")
);
