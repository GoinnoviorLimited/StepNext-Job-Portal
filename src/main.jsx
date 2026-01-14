import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Layouts/Root/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import ResumeBuilder from "./Components/ResumeBuilder/ResumeBuilder.jsx";
import ResumeForm from "./Components/CreateResume/ResumeForm.jsx";
import LoginPage from "./Components/Auth/LoginPage.jsx";
import SignUpPage from "./Components/Auth/SignUpPage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import TemplateSelection from "./Components/CreateResume/TemplateSelection.jsx";
import Profile from "./Components/Profile/Profile.jsx";

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
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/signup",
        Component: SignUpPage,
      },
      {
        path: "/templates",
        Component: TemplateSelection,
      },
      {
        path: "/profile",
        Component: Profile,
      },
    ],
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
