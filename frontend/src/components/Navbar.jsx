import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // ✅ hide before login

  return (
    <div
      style={{
        background: "#020617",
        borderBottom: "1px solid #1e293b",
        padding: "14px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#e5e7eb",
      }}
    >
      <div style={{ fontSize: "16px" }}>
        👋 Hello, <strong>{user.name}</strong>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        <button onClick={() => navigate("/history")}>History</button>

        <button
          onClick={() => {
            logout();
            navigate("/"); 
          }}
          style={{
            color: "#ef4444",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
