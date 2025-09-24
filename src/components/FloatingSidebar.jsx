/**
 * FloatingSidebar - always-visible floating icon bar
 * Shows round icons (Email, LinkedIn, GitHub, Resume, X, Instagram).
 */
export default function FloatingSidebar() {
  const EMAIL = "hareekrishna.v.s@gmail.com";
  const LINKEDIN_URL = "https://www.linkedin.com/in/hk2226/";
  const GITHUB_URL = "https://github.com/hareekrishnavs";
  const RESUME_URL = `${import.meta.env.BASE_URL || "/"}resume.pdf`;
  const X_URL = "https://x.com/Hareekrishna_VS"; // replace with your X handle
  const INSTA_URL = "https://www.instagram.com/hareekrishna_vs/"; // replace with your handle

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      alert("Email copied!");
    } catch {
      alert("Failed to copy");
    }
  }

  function IconButton({ href, onClick, icon, label }) {
    const inner = (
      <div className="h-11 w-11 flex items-center justify-center rounded-full bg-zinc-900 ring-1 ring-zinc-700 hover:bg-indigo-600 hover:text-white transition">
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
        <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7Z" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5A1.5 1.5 0 113.5 2a1.5 1.5 0 011.48 1.5zM2 8h4v12H2zM8 8h3.6v1.7h.05c.5-.9 1.7-1.6 3.5-1.6C19 8 20 10 20 13v7h-4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.6-2.3 3.1V20H8z" />
      </svg>
    ),
    github: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6 0-.3 0-1 0-2-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a10.9 10.9 0 015.7 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.3.8 1.1.8 2.1 0 1.5 0 2.8 0 3.2 0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
      </svg>
    ),
    resume: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
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
        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
      </svg>
    ),
  };

  return (
    <div className="fixed right-4 top-1/3 z-50 flex flex-col items-center gap-3">
      <IconButton onClick={copyEmail} icon={Icon.mail} label="Email" />
      <IconButton href={LINKEDIN_URL} icon={Icon.linkedin} label="LinkedIn" />
      <IconButton href={GITHUB_URL} icon={Icon.github} label="GitHub" />
      <IconButton href={RESUME_URL} icon={Icon.resume} label="Resume" />
      <IconButton href={X_URL} icon={Icon.x} label="X" />
      <IconButton href={INSTA_URL} icon={Icon.insta} label="Instagram" />
    </div>
  );
}
