import { useState } from "react";

export default function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume || !jd) {
      alert("Upload resume and paste JD");
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
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>InterAIview</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <textarea
        placeholder="Paste Job Description here..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <button onClick={handleAnalyze}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div className="result-box">
          <h2>Resume Match Result</h2>

          <h3 className="score">
            Match Score: {result.match_score}%
          </h3>

          <h4>Matched Skills</h4>
          <div className="chips">
            {result.matched_skills.map((s, i) => (
              <span key={i} className="chip green">{s}</span>
            ))}
          </div>

          <h4>Missing Skills</h4>
          <div className="chips">
            {result.missing_skills.map((s, i) => (
              <span key={i} className="chip red">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
