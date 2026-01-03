import ResultView from "./ResultView";
import { useState } from "react";
import { analyzeResume } from "../services/api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!file || !jd) {
      alert("Please upload resume and paste job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jd);

    try {
      setLoading(true);
      const data = await analyzeResume(formData);
      setResult(data);
    } catch (err) {
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <textarea
        rows="6"
        placeholder="Paste Job Description here..."
        style={{ width: "100%" }}
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

     {result && <ResultView result={result} />}


    </div>
  );
}
