import ReactMarkdown from "react-markdown";
type MessageBubbleProps = {
  role: "user" | "assistant";
  message: string;
  source?: {
    filename: string;
    chunk_number: number;
  };
};

export default function MessageBubble({
  role,
  message,
  source,
}: MessageBubbleProps) {

  const isUser = role === "user";

  return (

    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-6`}
    >

      <div
        className={`max-w-xl rounded-2xl px-5 py-4 shadow-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >

        <p className="leading-7 whitespace-pre-wrap">
            <ReactMarkdown
  components={{
    p: ({ children }) => (
      <p className="mb-3 leading-7">{children}</p>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),

    ul: ({ children }) => (
      <ul className="list-disc ml-6 mb-3 space-y-2">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal ml-6 mb-3 space-y-2">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li>{children}</li>
    ),

    code: ({ children }) => (
      <code className="rounded bg-slate-900 px-1 py-0.5 text-blue-300">
        {children}
      </code>
    ),
  }}
>
  {message}
</ReactMarkdown>
        </p>

        {!isUser && source && (

  <div className="mt-4 border-t border-slate-700 pt-4">

    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">
      Verified From
    </p>

    <div className="flex items-center gap-3 rounded-xl bg-slate-900 border border-slate-700 px-4 py-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20">
        📄
      </div>

      <div>

        <p className="text-sm font-semibold text-slate-100">
          {source.filename}
        </p>

        <p className="text-xs text-slate-400">
          Retrieved from your knowledge base
        </p>

      </div>

    </div>

  </div>

)}

      </div>

    </div>

  );

}