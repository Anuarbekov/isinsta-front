import React from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { UploadPage } from "./pages/UploadPage";
import { VotingPage } from "./pages/VotingPage";
import { ResultsPage } from "./pages/ResultsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/vote/:sessionId" element={<VotingPage />} />
        <Route path="/results/:sessionId" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
