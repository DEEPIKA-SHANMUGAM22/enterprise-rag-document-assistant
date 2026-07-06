import { Bot, Upload, Wifi } from "lucide-react";

type HeaderProps = {
  onUploadClick?: () => void;
};

export default function Header({ onUploadClick }: HeaderProps) {
  return (
    <header className="h-18 border-b border-slate-800 bg-slate-900 px-8 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">

          <Bot size={26} className="text-white" />

        </div>

        <div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Document Assistant
          </h1>

          <p className="text-sm text-slate-400">
            Search, understand & interact with your documents
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
        >
          <Upload size={18} />
          Upload
        </button>

        <div className="flex items-center gap-2 rounded-full border border-green-600/30 bg-green-600/10 px-4 py-2">

          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>

          <Wifi
            size={15}
            className="text-green-400"
          />

          <span className="text-sm text-green-300">
            Online
          </span>

        </div>

      </div>

    </header>
  );
}