// import { useState, useRef } from "react";
// import SectionTabs from "./SectionTabs";
// import QuestionBox from "./QuestionBox";
// import AnswerEditor from "./AnswerEditor";
// import VoiceRecorder from "./VoiceRecorder";
// import ControlBar from "./ControlBar";

// export default function InterviewPage() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const recognitionRef = useRef(null);

//   const getQuestion = async (section) => {
//     setAnswer("");

//     const res = await fetch("http://127.0.0.1:5000/api/interview/question", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ section }),
//     });

//     const data = await res.json();
//     setQuestion(data.question);
//   };

//   const submitAnswer = async () => {
//     await fetch("http://127.0.0.1:5000/api/interview/answer", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ answer }),
//     });

//     alert("Answer submitted");
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#020617",
//         color: "#e5e7eb",
//         padding: "40px",
//       }}
//     >
//       <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
//          AI Interview Assistant
//       </h2>

//       <SectionTabs onSelect={getQuestion} />

//       {question && (
//         <>
//           <QuestionBox question={question} />
//           <AnswerEditor answer={answer} setAnswer={setAnswer} />

//           <ControlBar
//             onSpeak={() =>
//               VoiceRecorder({ setAnswer, recognitionRef })
//             }
//             onSubmit={submitAnswer}
//           />
//         </>
//       )}
//     </div>
//   );
// }



import { useState, useRef } from "react";
import SectionTabs from "./SectionTabs";
import QuestionBox from "./QuestionBox";
import AnswerEditor from "./AnswerEditor";
import VoiceRecorder from "./VoiceRecorder";
import ControlBar from "./ControlBar";

export default function InterviewPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loadingEval, setLoadingEval] = useState(false);

  const recognitionRef = useRef(null);

  // 🔹 Fetch interview question
  const getQuestion = async (section) => {
    setAnswer("");
    setEvaluation("");
    setCurrentSection(section);

    const res = await fetch("http://127.0.0.1:5000/api/interview/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section }),
    });

    const data = await res.json();
    setQuestion(data.question);
  };

  // 🔹 Submit answer → AI evaluation
  const submitAnswer = async () => {
    setLoadingEval(true);

    const res = await fetch(
      "http://127.0.0.1:5000/api/interview/evaluate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: currentSection,
          question,
          answer,
        }),
      }
    );

    const data = await res.json();
    setEvaluation(data.feedback);
    setLoadingEval(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        padding: "40px",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        AI Interview Assistant
      </h2>

      {/* SECTION TABS */}
      <SectionTabs onSelect={getQuestion} />

      {question && (
        <>
          {/* QUESTION */}
          <QuestionBox question={question} />

          {/* ANSWER EDITOR */}
          <AnswerEditor answer={answer} setAnswer={setAnswer} />

          {/* CONTROLS */}
          <ControlBar
            onSpeak={() =>
              VoiceRecorder({ setAnswer, recognitionRef })
            }
            onSubmit={submitAnswer}
          />

          {/* AI EVALUATION */}
          {loadingEval && (
            <p style={{ marginTop: "16px", color: "#38bdf8" }}>
              Evaluating your answer...
            </p>
          )}

          {evaluation && (
            <div
              style={{
                marginTop: "24px",
                padding: "18px",
                background: "#020617",
                border: "1px solid #334155",
                borderRadius: "12px",
                whiteSpace: "pre-line",
              }}
            >
              <h3 style={{ color: "#38bdf8", marginBottom: "10px" }}>
                AI Interview Feedback
              </h3>
              {evaluation}
            </div>
          )}
        </>
      )}
    </div>
  );
}