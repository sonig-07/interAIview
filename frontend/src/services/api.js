export async function analyzeResume(formData) {
  const res = await fetch("http://127.0.0.1:5000/api/analyze-resume", {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}
