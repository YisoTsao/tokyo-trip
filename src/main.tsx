import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource/lxgw-wenkai-tc/400.css";
import "@fontsource/lxgw-wenkai-tc/700.css";
import "@fontsource/caveat/latin-600.css";
import "./styles/legacy.css";
import "./styles/tokens.css";
import "./styles/journal.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
