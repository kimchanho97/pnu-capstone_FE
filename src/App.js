import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RootLayout from "./layouts/RootLayout";
import GithubCallbackPage from "./pages/GithubCallbackPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/ProjectPage";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/create" element={<StartPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/project/:login" element={<ProjectPage />} />
          <Route path="/callback" element={<GithubCallbackPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
