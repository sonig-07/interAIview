
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import ResumeAnalyzer from "./pages/ResumeAnalyzer";
// // import InterviewAssistant from "./pages/InterviewAssistant";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Resume upload & JD analysis page */}
// //         <Route path="/" element={<ResumeAnalyzer />} />

// //         {/* Interview page */}
// //         <Route path="/interview" element={<InterviewAssistant />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import ResumeAnalyzer from "./pages/ResumeAnalyzer";
// import InterviewAssistant from "./pages/InterviewAssistant";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Resume + JD + Score */}
//         <Route path="/" element={<ResumeAnalyzer />} />

//         {/* Interview page */}
//         <Route path="/interview" element={<InterviewAssistant />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
// import ResumeAnalyzer from "./pages/ResumeAnalyzer";
// import InterviewPage from "./components/interview/InterviewPanel";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/resume" element={<ResumeAnalyzer />} />
//         <Route path="/interview" element={<InterviewPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }




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
