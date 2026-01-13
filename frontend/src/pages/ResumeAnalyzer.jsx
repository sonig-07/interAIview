import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeAnalyzer() {
  const navigate = useNavigate(); // ✅ FIXED HERE

  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async (e) => {
    e.preventDefault();

    if (!resume || !jd.trim()) {
      alert("Upload resume and paste Job Description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jd);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend error");
    } finally {
      setLoading(false);
    }
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
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Resume Analyzer
      </h1>

      {/* FORM */}
      <form onSubmit={analyzeResume}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <br />
        <br />

        <textarea
          rows="7"
          placeholder="Paste Job Description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          style={{
            width: "100%",
            background: "#020617",
            color: "white",
            border: "1px solid #334155",
            padding: "12px",
            borderRadius: "8px",
          }}
        />

        <br />
        <br />

        <button
          type="submit"
          style={{
            padding: "12px 22px",
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div style={{ marginTop: "40px" }}>
          <h2>Score: {result.score}%</h2>

          <h3 style={{ color: "#22c55e", marginTop: "20px" }}>
            Matched Skills
          </h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {result.matched_skills?.map((skill, i) => (
              <span
                key={i}
                style={{
                  background: "#064e3b",
                  padding: "6px 10px",
                  borderRadius: "6px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <h3 style={{ color: "#ef4444", marginTop: "20px" }}>
            Missing Skills
          </h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {result.missing_skills?.map((skill, i) => (
              <span
                key={i}
                style={{
                  background: "#7f1d1d",
                  padding: "6px 10px",
                  borderRadius: "6px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <br />
          <br />

          {/* INTERVIEW BUTTON */}
          <button
            onClick={() => navigate("/interview")}
            style={{
              padding: "14px 26px",
              fontSize: "16px",
              background: "#1e293b",
              color: "white",
              border: "1px solid #334155",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Start Your Interview →
          </button>
        </div>
      )}
    </div>
  );
}
