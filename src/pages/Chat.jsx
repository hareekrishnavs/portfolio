
import { useState } from "react";

const BASE_URL =
  import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") ||
  "https://haree2226-hareekrishnavs-portfolio-backend.hf.space";

async function callApiChat(question) {
  const payload = { question };
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`API ${res.status}: ${txt}`);
    }
    return await res.json();
  } catch (err) {
    // fallback
    const res = await fetch(`${BASE_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`API ${res.status}: ${txt}`);
    }
    return await res.json();
  }
}

function RenderedAnswer({ answer = "", links = [] }) {
  const linkQueue = Array.isArray(links) ? [...links] : [];

  const popLink = () => {
    if (!linkQueue.length) return null;
    const raw = String(linkQueue.shift());
    return raw.replace(/[)\]\.,'"\s]+$/, "");
  };

  const lines = String(answer || "")
    .replace(/\r\n/g, "\n")
    .split("\n");

  const isBulleted = lines.some((ln) => ln.trim().startsWith("- "));
  const isNumbered = lines.some((ln) => /^\d+\.\s+/.test(ln.trim()));

  if (isBulleted) {
    const items = lines
      .map((ln) => ln.trim())
      .filter((ln) => ln.startsWith("- "))
      .map((ln) => ln.replace(/^-+\s*/, "").trim());

    return (
      <ul className="list-inside list-disc space-y-2 text-zinc-200">
        {items.map((item, idx) => {
          const parts = item.split(/\[Link\]/i);
          if (parts.length === 1) {
            return <li key={idx}>{item}</li>;
          }
          const frag = [];
          for (let i = 0; i < parts.length; i++) {
            frag.push(<span key={`t-${i}`}>{parts[i]}</span>);
            if (i < parts.length - 1) {
              const url = popLink();
              if (url) {
                frag.push(
                  <a
                    key={`a-${i}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-block rounded px-2 py-0.5 text-xs font-bold bg-indigo-600 text-white hover:underline"
                  >
                    <strong>Link</strong>
                  </a>
                );
              } else {
                frag.push(
                  <span key={`na-${i}`} className="ml-1 inline-block text-xs text-zinc-400">
                    [Link]
                  </span>
                );
              }
            }
          }
          return <li key={idx}>{frag}</li>;
        })}
      </ul>
    );
  }

  if (isNumbered) {
    const items = lines
      .map((ln) => ln.trim())
      .filter((ln) => /^\d+\.\s+/.test(ln))
      .map((ln) => ln.replace(/^\d+\.\s+/, "").trim());

    return (
      <ol className="list-inside list-decimal space-y-2 text-zinc-200">
        {items.map((item, idx) => {
          const parts = item.split(/\[Link\]/i);
          if (parts.length === 1) return <li key={idx}>{item}</li>;
          const frag = [];
          for (let i = 0; i < parts.length; i++) {
            frag.push(<span key={`t-${i}`}>{parts[i]}</span>);
            if (i < parts.length - 1) {
              const url = popLink();
              if (url) {
                frag.push(
                  <a
                    key={`a-${i}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-block rounded px-2 py-0.5 text-xs font-bold bg-indigo-600 text-white hover:underline"
                  >
                    <strong>Link</strong>
                  </a>
                );
              } else {
                frag.push(<span key={`na-${i}`} className="ml-1 text-xs text-zinc-400">[Link]</span>);
              }
            }
          }
          return <li key={idx}>{frag}</li>;
        })}
      </ol>
    );
  }

  const paras = String(answer || "").split(/\n\s*\n/).filter(Boolean);
  if (!paras.length) {
    return <div className="text-sm text-zinc-400">No answer. Try the Read Me or email hareekrishna.v.s@gmail.com</div>;
  }
  return (
    <div className="space-y-3 text-zinc-200">
      {paras.map((p, i) => {
        if (/\[Link\]/i.test(p)) {
          const parts = p.split(/\[Link\]/i);
          const frag = [];
          for (let j = 0; j < parts.length; j++) {
            frag.push(<span key={`pt-${i}-${j}`}>{parts[j]}</span>);
            if (j < parts.length - 1) {
              const url = popLink();
              if (url) {
                frag.push(
                  <a
                    key={`pa-${i}-${j}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-block rounded px-2 py-0.5 text-xs font-bold bg-indigo-600 text-white hover:underline"
                  >
                    <strong>Link</strong>
                  </a>
                );
              } else {
                frag.push(<span key={`pna-${i}-${j}`} className="text-xs text-zinc-400">[Link]</span>);
              }
            }
          }
          return <p key={i}>{frag}</p>;
        }
        return <p key={i}>{p}</p>;
      })}
    </div>
  );
}

export default function Chat() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const samples = [
    "Where did Haree study his bachelors?",
    "List projects that use YOLO.",
    "How many years of experience do you have?",
  ];

  async function onAsk(text) {
    const question = (text ?? q).trim();
    if (!question) return;
    setItems((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);
    setQ("");
    try {
      const res = await callApiChat(question);
      const answerText = res.answer || res?.message || "";
      const links = Array.isArray(res.links) ? res.links : [];
      let finalAnswer = answerText;
      if (!finalAnswer || finalAnswer.trim().length < 3) {
        finalAnswer = `No direct answer found. Please check the Read Me or contact hareekrishna.v.s@gmail.com`;
      }
      setItems((prev) => [...prev, { role: "assistant", content: finalAnswer, links }]);
    } catch (err) {
      setItems((prev) => [...prev, { role: "assistant", content: `Error: ${err.message}. Check Read Me or email hareekrishna.v.s@gmail.com` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-8 space-y-4">
      <h1 className="title-2 text-zinc-100">Ask your question about Haree</h1>

      <div className="rounded-2xl border border-yellow-600/30 bg-yellow-900/10 p-3 text-sm text-yellow-200">
        ⚠️ Heads up: The backend runs on Hugging Face Spaces. If it was sleeping, the first request may be a cold start and take a bit longer.
      </div>

      <div className="card min-h-[36vh] p-4">
        <div className="space-y-4">
          {items.length === 0 && <div className="text-zinc-400">Kindly ask direct questions like "List all the projects with Machine Learning"</div>}

          {items.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 ${m.role === "user" ? "bg-indigo-900/20" : "bg-neutral-800/60"}`}
            >
              <div className="text-xs uppercase tracking-wide muted mb-1 text-zinc-300">
                {m.role === "user" ? "You" : "Assistant"}
              </div>

              {m.role === "user" ? (
                <div className="whitespace-pre-wrap text-zinc-100">{m.content}</div>
              ) : (
                <RenderedAnswer answer={m.content} links={m.links || []} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAsk()}
          placeholder="Type your question…"
          className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 outline-none ring-1 ring-neutral-800 focus:ring-indigo-500 text-zinc-200"
        />
        <button
          className="btn btn-primary"
          onClick={() => onAsk()}
          disabled={loading}
        >
          {loading ? "Thinking…" : "Ask"}
        </button>
      </div>

      <div>
        <div className="text-sm muted mb-2 text-zinc-400">Try:</div>
        <div className="flex flex-wrap gap-2">
          {samples.map((s, i) => (
            <button key={i} onClick={() => onAsk(s)} className="btn text-xs">
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
