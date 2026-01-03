export default function ResultView({ result }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Resume Match Result</h2>

      {/* Match Score */}
      <div
        style={{
          fontSize: "28px",
          margin: "12px 0",
          color: "#22c55e",
          fontWeight: "bold"
        }}
      >
        Match Score: {result.match_score}%
      </div>

      {/* Matched Skills */}
      <div style={{ marginTop: "20px" }}>
        <h3>Matched Skills</h3>
        {result.matched_skills.length === 0 && <p>None</p>}
        {result.matched_skills.map((skill) => (
          <span key={skill} style={tagStyle("#22c55e")}>
            {skill}
          </span>
        ))}
      </div>

      {/* Missing Skills */}
      <div style={{ marginTop: "20px" }}>
        <h3>Missing Skills</h3>
        {result.missing_skills.length === 0 && <p>None</p>}
        {result.missing_skills.map((skill) => (
          <span key={skill} style={tagStyle("#ef4444")}>
            {skill}
          </span>
        ))}
      </div>

      {/* AI Resume Feedback */}
      {result.ai_feedback && (
        <div style={{ marginTop: "25px" }}>
          <h3>AI Resume Feedback</h3>
          <p
            style={{
              background: "#020617",   // ⬅️ SAME background vibe (unchanged)
              padding: "15px",
              borderRadius: "8px",
              lineHeight: "1.6",
              whiteSpace: "pre-line"
            }}
          >
            {result.ai_feedback}
          </p>
        </div>
      )}
    </div>
  );
}

function tagStyle(color) {
  return {
    display: "inline-block",
    padding: "6px 12px",
    margin: "6px",
    borderRadius: "16px",
    background: color,
    color: "white",
    fontSize: "14px"
  };
}
