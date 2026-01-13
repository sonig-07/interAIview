export default function VoiceRecorder({ setAnswer, recognitionRef }) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    setAnswer(event.results[0][0].transcript);
  };

  recognition.start();
  recognitionRef.current = recognition;
}
