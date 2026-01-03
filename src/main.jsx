import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Layouts/Root/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import ResumeBuilder from "./Components/ResumeBuilder/ResumeBuilder.jsx";
import ResumeForm from "./Components/CreateResume/ResumeForm.jsx";
import Templates from "./Components/Resume/ViewTemplates/Templates.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "resumebuilders",
        Component: ResumeBuilder,
      },
      {
        path: "createresume",
        Component: ResumeForm,
      },
      {
        path: "templates",
        Component: Templates,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
