import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainLayout from "./layouts/MainLayout";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/create" element={<StartPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
