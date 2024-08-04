import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App.tsx";
import "normalize.css";
import "./index.css";
import "./media.css"
// import "./fonts/Play.ttf";
// import "./fonts/Play-Bold.ttf";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
