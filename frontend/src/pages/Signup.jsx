import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signup = async () => {
    setError("");

    const res = await fetch("http://127.0.0.1:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    // Save JWT
    localStorage.setItem("token", data.token);

    // Redirect to Resume Analyzer
    window.location.href = "/resume";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "32px",
          background: "#1e293b",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            textAlign: "center",
            color: "#f1f5f9",
          }}
        >
          Create Your InterAIview Account
        </h2>

        <div>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && (
            <p
              style={{
                color: "#f87171",
                marginBottom: "16px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button onClick={signup} style={buttonStyle}>
            Sign Up
          </button>

          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              color: "#94a3b8",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#38bdf8",
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "16px",
  background: "#334155",
  color: "#f1f5f9",
  border: "1px solid #475569",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.2s",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#0ea5e9",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "500",
  transition: "background 0.2s",
};

