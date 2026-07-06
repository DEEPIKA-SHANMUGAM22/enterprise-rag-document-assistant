export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6 gap-3">

      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
        AI
      </div>

      <div className="bg-slate-800 rounded-2xl px-5 py-4 shadow-lg">

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce"></span>

          <span
            className="h-2 w-2 rounded-full bg-slate-300 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>

          <span
            className="h-2 w-2 rounded-full bg-slate-300 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>

        </div>

      </div>

    </div>
  );
}