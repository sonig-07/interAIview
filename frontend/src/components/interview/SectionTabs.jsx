export default function SectionTabs({ onSelect }) {
  const sections = ["introduction", "technical", "behavioral", "hr", "gd"];

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
      {sections.map((sec) => (
        <button
          key={sec}
          onClick={() => onSelect(sec)}
          style={{
            padding: "10px 16px",
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {sec.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
