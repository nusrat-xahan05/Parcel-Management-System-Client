import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "./providers/theme.provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>
);