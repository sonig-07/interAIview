import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617", // navy blue (UNCHANGED)
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        InterAIview
      </h1>

      <p style={{ maxWidth: "700px", marginBottom: "30px", color: "#94a3b8" }}>
        InterAIview helps you analyze your resume against job descriptions
        and prepares you with AI-driven interview questions — technical,
        HR, behavioral, and group discussion.
      </p>

      <p style={{ marginBottom: "40px", color: "#94a3b8" }}>
        All in one place.
      </p>

      {/* AUTH BUTTONS */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "30px" }}>
        <button
          onClick={() => navigate("/login")}
          style={secondaryBtn}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          style={primaryBtn}
        >
          Sign Up
        </button>
      </div>

      {/* MAIN CTA */}
      <button
        onClick={() => navigate("/resume")}
        style={ctaBtn}
      >
        Start Resume Analysis →
      </button>
    </div>
  );
}

const primaryBtn = {
  padding: "12px 22px",
  background: "#1e293b",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "12px 22px",
  background: "transparent",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "8px",
  cursor: "pointer",
};

const ctaBtn = {
  marginTop: "10px",
  padding: "14px 26px",
  fontSize: "16px",
  background: "#0f172a",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "8px",
  cursor: "pointer",
};




// import { useNavigate } from "react-router-dom";

// export default function Landing() {
//   const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#020617", // navy blue
//         color: "#e5e7eb",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px",
//         textAlign: "center",
//       }}
//     >
//       <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
//         InterAIview
//       </h1>

//       <p style={{ maxWidth: "700px", marginBottom: "30px", color: "#94a3b8" }}>
//         InterAIview helps you analyze your resume against job descriptions
//         and prepares you with AI-driven interview questions — technical,
//         HR, behavioral, and group discussion.</p> <p> All In One Place.</p>
       
//      <br></br>
//       <button
//         onClick={() => navigate("/resume")}
//         style={{
//           padding: "14px 26px",
//           fontSize: "16px",
//           background: "#1e293b",
//           color: "white",
//           border: "1px solid #334155",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         Start Resume Analysis →
//       </button>
//     </div>
//   );
// }
