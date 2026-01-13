import { useState, useRef } from "react";
import SectionTabs from "./SectionTabs";
import QuestionBox from "./QuestionBox";
import AnswerEditor from "./AnswerEditor";
import VoiceRecorder from "./VoiceRecorder";
import ControlBar from "./ControlBar";

export default function InterviewPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const recognitionRef = useRef(null);

  const getQuestion = async (section) => {
    setAnswer("");

    const res = await fetch("http://127.0.0.1:5000/api/interview/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section }),
    });

    const data = await res.json();
    setQuestion(data.question);
  };

  const submitAnswer = async () => {
    await fetch("http://127.0.0.1:5000/api/interview/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });

    alert("Answer submitted");
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
        🎤 AI Interview Assistant
      </h2>

      <SectionTabs onSelect={getQuestion} />

      {question && (
        <>
          <QuestionBox question={question} />
          <AnswerEditor answer={answer} setAnswer={setAnswer} />

          <ControlBar
            onSpeak={() =>
              VoiceRecorder({ setAnswer, recognitionRef })
            }
            onSubmit={submitAnswer}
          />
        </>
      )}
    </div>
  );
}
