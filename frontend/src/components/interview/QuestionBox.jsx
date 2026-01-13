export default function QuestionBox({ question }) {
  return (
    <div
      style={{
        background: "#020617",
        border: "1px solid #334155",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>Question</h3>
      <p>{question}</p>
    </div>
  );
}
