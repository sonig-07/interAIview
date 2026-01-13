export default function AnswerEditor({ answer, setAnswer }) {
  return (
    <>
      <h3>Your Answer</h3>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows="5"
        style={{
          width: "100%",
          background: "#020617",
          color: "white",
          border: "1px solid #334155",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
      />
    </>
  );
}
