import { useState } from "react";
import PROFILE_SRC from "../assets/profile.png";

export default function Navbar({ tab, setTab }) {
  const EMAIL = "hareekrishna.v.s@gmail.com";
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Read Me" },
    { id: "chat", label: "Ask Me" },
  ];

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  function onSelect(id) {
    setTab(id);
    setOpen(false); // close mobile menu when selecting
  }

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/50">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left: avatar + name (truncate to avoid overlap) */}
        <div className="min-w-0 flex items-center gap-3">
          <img
            src={PROFILE_SRC}
            alt="Hareekrishna"
            className="h-10 w-10 rounded-full object-cover border border-zinc-700 shadow-md"
            style={{ imageRendering: "high-quality", WebkitImageRendering: "optimize-contrast" }}
          />
          <div className="truncate text-lg font-semibold tracking-tight">
            Hareekrishna VS
          </div>
        </div>

        {/* Desktop: tabs + email icon */}
        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex gap-1 p-1 rounded-xl bg-zinc-900 ring-1 ring-zinc-800">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelect(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    active ? "bg-indigo-600 text-white" : "text-zinc-300 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>

          {/* Email icon */}
          <button
            onClick={copyEmail}
            className="relative group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 ring-1 ring-zinc-800 hover:ring-indigo-400 transition"
            aria-label={`Copy email ${EMAIL}`}
            title={EMAIL}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-zinc-300 group-hover:text-white transition"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-200 opacity-0 ring-1 ring-zinc-700 transition group-hover:opacity-100">
              {copied ? "Copied!" : EMAIL}
            </span>
          </button>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-300 ring-1 ring-zinc-800 hover:bg-zinc-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {/* Hamburger / Close icon */}
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown panel (no overlap with name) */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
          <div className="container px-4 py-3 space-y-3">
            <nav className="flex flex-col gap-2">
              {tabs.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={`w-full rounded-lg px-4 py-2 text-left text-sm ${
                      active ? "bg-indigo-600 text-white" : "bg-zinc-900 text-zinc-300 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm text-zinc-300 ring-1 ring-zinc-800 hover:ring-indigo-400"
              title={EMAIL}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {copied ? "Copied!" : EMAIL}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
