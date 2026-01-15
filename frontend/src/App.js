// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ResumeAnalyzer from "./pages/ResumeAnalyzer";
// // import InterviewAssistant from "./pages/InterviewAssistant";
// import InterviewPanel from "./components/interview/InterviewPanel";
// import History from "./pages/History";

// import Navbar from "./components/Navbar";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar /> {/* shows only when user is logged in */}
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/resume" element={<ResumeAnalyzer />} />
//            <Route path="/interview" element={<InterviewPanel />} />
//           {/* <Route path="/interview" element={<InterviewAssistant />} /> */}
//           <Route path="/history" element={<History />} /> 
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;





import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewPanel from "./components/interview/InterviewPanel";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resume" element={<ResumeAnalyzer />} />
      <Route path="/interview" element={<InterviewPanel />} />
      <Route path="/history" element={<History />} /> 
    </Routes>
  );
}

export default App;
