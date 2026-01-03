import { Routes, Route } from "react-router-dom";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewAssistant from "./pages/InterviewAssistant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ResumeAnalyzer />} />
      <Route path="/interview" element={<InterviewAssistant />} />
    </Routes>
  );
}

export default App;
