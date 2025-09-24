import { useState } from "react";
import { chat } from "../lib/api";

const samples = [
  "Where did Haree study his bachelors?",
  "List projects that use YOLO.",
  "How many years of experience do you have?",
];

export default function Chat() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  async function onAsk(text) {
    const question = (text ?? q).trim();
    if (!question) return;
    const userMsg = { role: "user", content: question };
    setItems((prev) => [...prev, userMsg]);
    setLoading(true);
    setQ("");

    try {
      const res = await chat(userMsg.content);
      const botMsg = {
        role: "assistant",
        content: res.answer || JSON.stringify(res, null, 2),
        sources: res.sources || [],
      };
      setItems((prev) => [...prev, botMsg]);
    } catch (err) {
      setItems((prev) => [...prev, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-8 space-y-4">
      <h1 className="title-2">Ask your question about Haree</h1>

      <div className="rounded-2xl border border-yellow-600/30 bg-yellow-900/10 p-3 text-sm text-yellow-200">
        ⚠️ Heads up: The backend runs on Hugging Face Spaces. If it was sleeping, the first request may be a cold start and take a bit longer.
      </div>

      <div className="card min-h-[50vh]">
        <div className="space-y-3">
          {items.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 ${m.role === "user" ? "bg-indigo-900/30" : "bg-neutral-800/60"}`}
            >
              <div className="text-xs uppercase tracking-wide muted mb-1">
                {m.role === "user" ? "You" : "Assistant"}
              </div>
              <div className="whitespace-pre-wrap">{m.content}</div>

              {m.sources?.length ? (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs muted">Sources</summary>
                  <ul className="mt-1 text-xs list-disc pl-6 text-neutral-300">
                    {m.sources.map((s, idx) => (
                      <li key={idx}>
                        <span className="font-mono">{s.path}</span>{" "}
                        {typeof s.score === "number" ? `– score: ${s.score.toFixed(3)}` : ""}
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </div>
          ))}

          {items.length === 0 && <div className="muted">Ask about projects, experience, education…</div>}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAsk()}
          placeholder="Type your question…"
          className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 outline-none ring-1 ring-neutral-800 focus:ring-indigo-500"
        />
        <button className="btn btn-primary" onClick={() => onAsk()} disabled={loading}>
          {loading ? "Thinking…" : "Ask"}
        </button>
      </div>

      <div>
        <div className="text-sm muted mb-2">Try:</div>
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
