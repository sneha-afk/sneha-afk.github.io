import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PostsProvider } from "@context";
import App from "./App.tsx";
import "@styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostsProvider>
      <App />
    </PostsProvider>
  </StrictMode>,
);
