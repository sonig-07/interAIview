import { useState } from "react";

export default function ResumeUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload a resume and paste job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#020617",
        padding: "24px",
        borderRadius: "12px",
        maxWidth: "900px",
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Resume Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Upload Resume (PDF / DOCX)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            style={{
              padding: "8px",
              backgroundColor: "#020617",
              color: "#e5e7eb",
            }}
          />
        </div>

        {/* Job Description */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Job Description
          </label>
          <textarea
            rows="6"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#020617",
              color: "#e5e7eb",
              borderRadius: "8px",
              border: "1px solid #1e293b",
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* Error */}
        {error && (
          <p style={{ color: "#f87171", marginTop: "16px" }}>{error}</p>
        )}
      </form>

      {/* Result */}
      {result && (
        <div style={{ marginTop: "32px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
            Match Score: {result.match_score}%
          </h2>

          {/* Matched Skills */}
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ marginBottom: "8px" }}>Matched Skills</h3>
            {result.matched_skills.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  margin: "4px",
                  padding: "6px 12px",
                  backgroundColor: "#16a34a",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Missing Skills */}
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ marginBottom: "8px" }}>Missing Skills</h3>
            {result.missing_skills.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  margin: "4px",
                  padding: "6px 12px",
                  backgroundColor: "#dc2626",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Resume Preview */}
          <div>
            <h3 style={{ marginBottom: "8px" }}>Resume Preview</h3>
            <p
              style={{
                backgroundColor: "#020617",
                padding: "12px",
                borderRadius: "8px",
                color: "#cbd5f5",
              }}
            >
              {result.resume_preview}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
