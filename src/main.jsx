import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";

import AuthProvider from "./Context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    <Toaster />
  </StrictMode>
);
