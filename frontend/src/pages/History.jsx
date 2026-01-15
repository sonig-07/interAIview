import { useEffect, useState } from "react";

export default function History() {
  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://127.0.0.1:5000/api/history/resume", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ FIX
      },
    })
      .then((res) => res.json())
      .then(setResumes)
      .catch(console.error);

    fetch("http://127.0.0.1:5000/api/history/interview", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ FIX
      },
    })
      .then((res) => res.json())
      .then(setInterviews)
      .catch(console.error);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "26px", marginBottom: "30px" }}>
        📜 Your Activity History
      </h1>

      {/* ================= RESUME HISTORY ================= */}
      <div
        style={{
          border: "1px solid #1e293b",
          borderRadius: "14px",
          padding: "24px",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>📄 Resume Analysis</h2>

        {resumes.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No resume analysis yet.
          </p>
        ) : (
          resumes.map((r, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #1e293b",
                paddingBottom: "14px",
                marginBottom: "14px",
              }}
            >
              <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
                <b>Feedback:</b> {r.feedback}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ================= INTERVIEW HISTORY ================= */}
      <div
        style={{
          border: "1px solid #1e293b",
          borderRadius: "14px",
          padding: "24px",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>🎤 Interviews</h2>

        {interviews.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No interview sessions yet.
          </p>
        ) : (
          interviews.map((i, idx) => (
            <div
              key={idx}
              style={{
                borderBottom: "1px solid #1e293b",
                paddingBottom: "16px",
                marginBottom: "16px",
              }}
            >
              <p><b>Q:</b> {i.question}</p>
              <p><b>Your Answer:</b> {i.answer}</p>
              <p style={{ whiteSpace: "pre-line" }}>
                <b>AI Feedback:</b> {i.feedback}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
