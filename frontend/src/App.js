import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewPanel from "./components/interview/InterviewPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
        <Route path="/interview" element={<InterviewPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
