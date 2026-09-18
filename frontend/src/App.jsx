import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    // Show user's question immediately
    setMessages((oldMessages) => [
      ...oldMessages,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userQuestion,
        }),
      });

      const data = await response.json();

      // Add AI answer to chat history
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          role: "ai",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          role: "ai",
          content: "Something went wrong. Please try again.",
        },
      ]);
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

        {/* Chat History */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "bg-blue-100 p-4 rounded-lg ml-12"
                  : "bg-gray-100 p-4 rounded-lg mr-12"
              }
            >
              <p className="font-semibold mb-1">
                {message.role === "user" ? "You" : "AI"}
              </p>

              <p className="text-gray-700 whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 p-4 rounded-lg mr-12">
              <p className="font-semibold">AI</p>
              <p className="text-gray-500">Thinking...</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
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

      </div>
    </div>
  );
}

export default App;