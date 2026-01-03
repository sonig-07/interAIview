import React, { useState } from "react";

const sections = [
  "Introduction",
  "Technical",
  "Behavioral",
  "HR",
  "GD",
];

export default function InterviewAssistant() {
  const [selectedSection, setSelectedSection] = useState("Introduction");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate Interview Question
  const generateQuestion = async () => {
    setLoading(true);
    setQuestion("");
    setFeedback("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section: selectedSection,
        }),
      });

      const data = await res.json();
      setQuestion(data.question || "No question generated.");
    } catch (error) {
      setQuestion("❌ Error generating question.");
    }

    setLoading(false);
  };

  // Submit Answer for Evaluation
  const submitAnswer = async () => {
    if (!answer.trim()) return;

    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/evaluate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section: selectedSection,
          question,
          answer,
        }),
      });

      const data = await res.json();
      setFeedback(data.feedback || "No feedback received.");
    } catch (error) {
      setFeedback("❌ Error evaluating answer.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🎤 AI Interview Assistant
        </h1>

        {/* Section Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedSection === sec
                  ? "bg-blue-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Question Box */}
        <div className="bg-slate-800 p-5 rounded-lg mb-4">
          <h2 className="font-semibold mb-2">Question</h2>
          {question ? (
            <p className="leading-relaxed">{question}</p>
          ) : (
            <p className="text-slate-400">No question generated yet.</p>
          )}
        </div>

        {/* Answer Input */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows={5}
        />

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={generateQuestion}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Loading..." : "Generate Question"}
          </button>

          <button
            onClick={submitAnswer}
            disabled={loading || !question}
            className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Submit Answer
          </button>
        </div>

        {/* Feedback Box */}
        {feedback && (
          <div className="bg-slate-800 p-5 rounded-lg">
            <h2 className="font-semibold mb-2">AI Feedback</h2>
            <p className="leading-relaxed">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
