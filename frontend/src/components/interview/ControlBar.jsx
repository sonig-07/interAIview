export default function ControlBar({ onSpeak, onSubmit }) {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <button
        onClick={onSpeak}
        style={{
          padding: "10px 16px",
          background: "#0f172a",
          color: "white",
          border: "1px solid #334155",
          borderRadius: "8px",
        }}
      >
        🎙️ Speak
      </button>

      <button
        onClick={onSubmit}
        style={{
          padding: "10px 16px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Submit
      </button>
    </div>
  );
}
