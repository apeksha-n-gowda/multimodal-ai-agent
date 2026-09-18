import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: question,
        }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          🤖 Multimodal AI Agent
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Ask questions and interact with AI
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">
            AI Response
          </h2>

          <div className="bg-gray-50 border rounded-lg p-5 min-h-32">
            {loading ? (
              <p className="text-gray-500">AI is thinking...</p>
            ) : answer ? (
              <p className="text-gray-700 whitespace-pre-wrap">
                {answer}
              </p>
            ) : (
              <p className="text-gray-400">
                Your AI response will appear here.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;