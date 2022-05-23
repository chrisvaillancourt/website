import { MountableElement, render } from "solid-js/web";
import { Router } from "solid-app-router";
import App from "../components/App";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as MountableElement
);
