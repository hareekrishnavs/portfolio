// src/components/FloatingSidebar.jsx
import { useEffect, useState } from "react";

export default function FloatingSidebar() {
  const EMAIL = "hareekrishna.v.s@gmail.com";
  const LINKEDIN_URL = "https://www.linkedin.com/in/hk2226/";
  const GITHUB_URL = "https://github.com/hareekrishnavs";
  const RESUME_URL = `${import.meta.env.BASE_URL || "/"}resume.pdf`;
  const X_URL = "https://x.com/Hareekrishna_VS";
  const INSTA_URL = "https://www.instagram.com/hareekrishna_vs/";

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hk.sidebarCollapsed");
    if (saved === "1") setCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("hk.sidebarCollapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      // small transient visual feedback
      const el = document.createElement("div");
      el.textContent = "Email copied!";
      el.className =
        "fixed right-4 top-4 z-[999] rounded-md bg-zinc-900 text-zinc-100 px-3 py-1 text-sm ring-1 ring-zinc-700";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  function IconButton({ href, onClick, icon, label }) {
    const inner = (
      <div
        className="h-11 w-11 flex items-center justify-center rounded-full bg-zinc-900 ring-1 ring-zinc-700
                   hover:bg-indigo-600 hover:text-white transition"
        title={label}
        aria-label={label}
      >
        {icon}
      </div>
    );
    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          {inner}
        </a>
      );
    }
    return (
      <button onClick={onClick} aria-label={label}>
        {inner}
      </button>
    );
  }

  const Icon = {
    mail: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5A1.5 1.5 0 1 1 3.5 2 1.5 1.5 0 0 1 4.98 3.5zM2 8h4v12H2zM8 8h3.6v1.7h.05c.5-.9 1.7-1.6 3.5-1.6C19 8 20 10 20 13v7h-4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.6-2.3 3.1V20H8z" />
      </svg>
    ),
    github: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.9.6.1.82-.24.82-.53 0-.26-.01-.95-.01-1.85-3.2.7-3.88-1.37-3.88-1.37-.54-1.37-1.33-1.73-1.33-1.73-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.82 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.56-.29-5.25-1.28-5.25-5.67 0-1.25.45-2.27 1.2-3.07-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.21 1.18 1-.28 2.06-.42 3.12-.42s2.12.14 3.12.42c2.23-1.49 3.21-1.18 3.21-1.18.63 1.58.23 2.75.11 3.04.75.8 1.2 1.82 1.2 3.07 0 4.4-2.69 5.38-5.26 5.66.43.37.82 1.1.82 2.22 0 1.6-.01 2.88-.01 3.27 0 .29.22.64.83.53C20.21 21.39 23.5 17.09 23.5 12 23.5 5.73 18.27.5 12 .5z" />
      </svg>
    ),
    resume: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M12 18v-6" />
        <path d="M9 15l3 3 3-3" />
      </svg>
    ),
    x: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.36 2H21l-6.54 7.47L22 22h-5.64l-4.35-6.6L7.65 22H3l7.47-8.53L2 2h5.64l4.06 6.2L18.36 2z" />
      </svg>
    ),
    insta: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM12 7a5 5 0 100 10A5 5 0 0 1 12 7zm0 2.2A2.8 2.8 0 1 0 12 15.8 2.8 2.8 0 0 0 12 9.2zm4.6-2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
      </svg>
    ),
    chevronLeft: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    ),
    chevronRight: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    ),
    grid: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 3H3v7h7V3zm11 0h-7v7h7V3zM10 14H3v7h7v-7zm11 0h-7v7h7v-7z" />
      </svg>
    ),
  };

  // If collapsed => show compact pill (visible on all sizes)
  if (collapsed) {
    return (
      <div
        // position: bottom-right on small, right-middle on md+
        className="fixed right-4 md:top-1/3 md:bottom-auto bottom-4 z-50"
      >
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 rounded-full bg-zinc-900/90 px-3 py-2 ring-1 ring-zinc-700 hover:bg-indigo-600 transition"
          aria-label="Expand sidebar"
          title="Show contacts"
        >
          {Icon.grid}
          <span className="text-xs text-zinc-200 hidden sm:inline">Contacts</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed right-4 z-50
                 md:top-1/3 md:bottom-auto
                 bottom-4"
      aria-hidden={false}
    >
      <div className="flex flex-col items-center gap-3">
        <IconButton onClick={copyEmail} icon={Icon.mail} label="Email" />
        <IconButton href={LINKEDIN_URL} icon={Icon.linkedin} label="LinkedIn" />
        <IconButton href={GITHUB_URL} icon={Icon.github} label="GitHub" />
        <IconButton href={RESUME_URL} icon={Icon.resume} label="Resume" />
        <IconButton href={X_URL} icon={Icon.x} label="X" />
        <IconButton href={INSTA_URL} icon={Icon.insta} label="Instagram" />

        <button
          onClick={() => setCollapsed(true)}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300 ring-1 ring-zinc-700 hover:bg-zinc-800 transition"
          aria-label="Collapse sidebar"
          title="Hide contacts"
        >
          {Icon.chevronLeft}
          <span className="hidden sm:inline">Hide</span>
        </button>
      </div>
    </div>
  );
}
