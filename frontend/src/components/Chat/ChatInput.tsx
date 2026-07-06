import { useState } from "react";

type ChatInputProps = {
  onSend: (question: string) => void;
  loading: boolean;
};

export default function ChatInput({
  onSend,
  loading,
}: ChatInputProps) {
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    if (!question.trim()) return;

    onSend(question);
    setQuestion("");
  };

  return (
    <div className="border-t border-slate-800 p-5">
      <div className="flex gap-4">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask anything about your documents..."
          className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 outline-none"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl disabled:bg-slate-600"
        >
          {loading ? "..." : "Send"}
        </button>

      </div>
    </div>
  );
}