import { useState } from "react";
import profileImg from "../assets/profile.png";

export default function Navbar({ tab, setTab }) {
  const EMAIL = "hareekrishna.v.s@gmail.com";

  const tabs = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Read Me" },
    { id: "chat", label: "Ask Me" },
  ];

  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left: Image + Name */}
        <div className="flex items-center gap-3">
          <img
            src={profileImg} 
            alt="Hareekrishna"
            className="h-12 w-12 rounded-full object-cover border border-neutral-700 shadow-md"
            style={{ imageRendering: "high-quality", WebkitImageRendering: "optimize-contrast" }}
          />
          <div className="text-lg font-semibold tracking-tight">Hareekrishna VS</div>
        </div>

        {/* Right: Tabs + Email */}
        <div className="flex items-center gap-3">
          <nav className="flex gap-1 p-1 rounded-xl bg-neutral-900 ring-1 ring-neutral-800">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    active ? "bg-indigo-600 text-white" : "text-neutral-300 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>

          {/* Email icon with hover tooltip + click-to-copy */}
          <button
            onClick={copyEmail}
            className="relative group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 ring-1 ring-neutral-800 hover:ring-indigo-400 transition"
            aria-label={`Copy email ${EMAIL}`}
            title={EMAIL}
          >
            {/* Mail Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-300 group-hover:text-white transition"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
              <path d="m3 7 9 6 9-6" />
            </svg>

            {/* Tooltip */}
            <span
              className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-800 px-2 py-1 text-xs text-neutral-200 opacity-0 ring-1 ring-neutral-700 transition group-hover:opacity-100"
              role="tooltip"
            >
              {copied ? "Copied!" : EMAIL}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
