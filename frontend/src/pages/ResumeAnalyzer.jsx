import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeAnalyzer() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async (e) => {
    e.preventDefault();

    if (!resume || !jd.trim()) {
      alert("Upload resume and paste Job Description");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jd);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/analyze-resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // 🔐 REQUIRED
        },
        body: formData,
      });

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
        Resume Analyzer
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: result?.ai_feedback ? "1.2fr 1fr" : "1fr",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            background: "#020617",
            border: "1px solid #1e293b",
            borderRadius: "16px",
            padding: "30px",
          }}
        >
          <form onSubmit={analyzeResume}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
            />

            <br /><br />

            <textarea
              rows="7"
              placeholder="Paste Job Description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              style={{
                width: "100%",
                background: "#020617",
                color: "white",
                border: "1px solid #334155",
                padding: "14px",
                borderRadius: "10px",
              }}
            />

            <br /><br />

            <button
              type="submit"
              style={{
                padding: "12px 22px",
                background: "#1e293b",
                color: "white",
                border: "1px solid #334155",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </form>

          {result && (
            <div style={{ marginTop: "40px" }}>
              <h2>Score: {result.match_score}%</h2>

              <h3 style={{ color: "#22c55e", marginTop: "20px" }}>
                Matched Skills
              </h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {result.matched_skills?.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#064e3b",
                      padding: "6px 12px",
                      borderRadius: "6px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h3 style={{ color: "#ef4444", marginTop: "20px" }}>
                Missing Skills
              </h3>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {result.missing_skills?.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#7f1d1d",
                      padding: "6px 12px",
                      borderRadius: "6px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <br />

              <button
                onClick={() => navigate("/interview")}
                style={{
                  padding: "14px 26px",
                  fontSize: "16px",
                  background: "#1e293b",
                  color: "white",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Start Your Interview →
              </button>
            </div>
          )}
        </div>

        {/* RIGHT */}
        {result?.ai_feedback && (
          <div
            style={{
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <h3 style={{ color: "#38bdf8", marginBottom: "12px" }}>
              Resume Feedback
            </h3>

            <div
              style={{
                border: "1px solid #334155",
                borderRadius: "10px",
                padding: "16px",
                whiteSpace: "pre-line",
                lineHeight: "1.6",
                fontSize: "15px",
              }}
            >
              {result.ai_feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ResumeAnalyzer() {
//   const navigate = useNavigate();

//   const [resume, setResume] = useState(null);
//   const [jd, setJd] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const analyzeResume = async (e) => {
//     e.preventDefault();

//     if (!resume || !jd.trim()) {
//       alert("Upload resume and paste Job Description");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", resume);
//     formData.append("job_description", jd);

//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:5000/api/analyze-resume", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`, // 🔐 AUTH ADDED
//         },
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Failed to analyze resume");
//       }

//       const data = await res.json();
//       setResult(data);
//     } catch (err) {
//       console.error(err);
//       alert("Backend error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#020617",
//         color: "#e5e7eb",
//         padding: "40px",
//       }}
//     >
//       <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
//         Resume Analyzer
//       </h1>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: result?.ai_feedback ? "1.2fr 1fr" : "1fr",
//           gap: "30px",
//           alignItems: "flex-start",
//         }}
//       >
//         {/* LEFT */}
//         <div
//           style={{
//             background: "#020617",
//             border: "1px solid #1e293b",
//             borderRadius: "16px",
//             padding: "30px",
//           }}
//         >
//           <form onSubmit={analyzeResume}>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={(e) => setResume(e.target.files[0])}
//             />

//             <br /><br />

//             <textarea
//               rows="7"
//               placeholder="Paste Job Description here..."
//               value={jd}
//               onChange={(e) => setJd(e.target.value)}
//               style={{
//                 width: "100%",
//                 background: "#020617",
//                 color: "white",
//                 border: "1px solid #334155",
//                 padding: "14px",
//                 borderRadius: "10px",
//               }}
//             />

//             <br /><br />

//             <button
//               type="submit"
//               style={{
//                 padding: "12px 22px",
//                 background: "#1e293b",
//                 color: "white",
//                 border: "1px solid #334155",
//                 borderRadius: "10px",
//                 cursor: "pointer",
//               }}
//             >
//               {loading ? "Analyzing..." : "Analyze Resume"}
//             </button>
//           </form>

//           {result && (
//             <div style={{ marginTop: "40px" }}>
//               <h2>Score: {result.match_score}%</h2>

//               <h3 style={{ color: "#22c55e", marginTop: "20px" }}>
//                 Matched Skills
//               </h3>
//               <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//                 {result.matched_skills?.map((skill, i) => (
//                   <span
//                     key={i}
//                     style={{
//                       background: "#064e3b",
//                       padding: "6px 12px",
//                       borderRadius: "6px",
//                     }}
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>

//               <h3 style={{ color: "#ef4444", marginTop: "20px" }}>
//                 Missing Skills
//               </h3>
//               <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//                 {result.missing_skills?.map((skill, i) => (
//                   <span
//                     key={i}
//                     style={{
//                       background: "#7f1d1d",
//                       padding: "6px 12px",
//                       borderRadius: "6px",
//                     }}
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>

//               <br />

//               <button
//                 onClick={() => navigate("/interview")}
//                 style={{
//                   padding: "14px 26px",
//                   fontSize: "16px",
//                   background: "#1e293b",
//                   color: "white",
//                   border: "1px solid #334155",
//                   borderRadius: "10px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Start Your Interview →
//               </button>
//             </div>
//           )}
//         </div>

//         {/* RIGHT */}
//         {result?.ai_feedback && (
//           <div
//             style={{
//               background: "#020617",
//               border: "1px solid #1e293b",
//               borderRadius: "16px",
//               padding: "24px",
//             }}
//           >
//             <h3 style={{ color: "#38bdf8", marginBottom: "12px" }}>
//               Resume Feedback
//             </h3>

//             <div
//               style={{
//                 border: "1px solid #334155",
//                 borderRadius: "10px",
//                 padding: "16px",
//                 whiteSpace: "pre-line",
//                 lineHeight: "1.6",
//                 fontSize: "15px",
//               }}
//             >
//               {result.ai_feedback}
//             </div>
//           </div>
//         )}
//       </div>


//     </div>
//   );
// }
