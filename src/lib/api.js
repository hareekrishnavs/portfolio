// src/lib/api.js
const BASE_URL =
  import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") ||
  "https://haree2226-hareekrishnavs-portfolio-backend.hf.space";

/** Helper to throw a readable error for non-OK responses */
async function toJsonOrThrow(resp) {
  if (resp.ok) {
    const ct = resp.headers.get("content-type") || "";
    if (ct.includes("application/json")) return resp.json();
    // try to parse text fallback
    const txt = await resp.text();
    try {
      return JSON.parse(txt);
    } catch {
      return { answer: txt };
    }
  }
  const text = await resp.text();
  throw new Error(`API ${resp.status}: ${text}`);
}

/** Generic POST helper */
async function postJson(path, body) {
  const url = `${BASE_URL}${path}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  return toJsonOrThrow(resp);
}

/** Generic GET helper */
async function getJson(path) {
  const url = `${BASE_URL}${path}`;
  const resp = await fetch(url);
  return toJsonOrThrow(resp);
}

/** Ensure the returned object uses { answer: string, links: string[] } shape */
function normalizeResponse(obj) {
  if (!obj) return { answer: "", links: [] };
  // backend may return "answer" or "message" or raw string
  const answer = typeof obj.answer === "string" ? obj.answer : (typeof obj.message === "string" ? obj.message : (typeof obj === "string" ? obj : ""));
  let links = [];
  if (Array.isArray(obj.links)) links = obj.links;
  // some endpoints may return { results: [...], links: [...] } or other shapes
  if (!links.length && Array.isArray(obj.results)) {
    // try to extract meta.link from results (best-effort)
    obj.results.forEach((r) => {
      if (r?.meta?.link) links.push(r.meta.link);
      else if (r?.link) links.push(r.link);
    });
  }
  // final sanitize: make all links strings and trim trailing punctuation
  links = links
    .filter(Boolean)
    .map((l) => String(l).trim().replace(/[)\]\.,'"\s]+$/, ""))
    .filter(Boolean);
  return { answer: String(answer || "").trim(), links };
}

/* ----------------- Public API ----------------- */

export async function getAbout() {
  const j = await getJson("/api/about");
  return j;
}
export async function getEducation() {
  const j = await getJson("/api/education");
  return j;
}
export async function getProjects() {
  const j = await getJson("/api/projects");
  return j;
}
export async function getExperience() {
  const j = await getJson("/api/experience");
  return j;
}
export async function getCertificates() {
  const j = await getJson("/api/certificates");
  return j;
}
export async function getCompetitive() {
  const j = await getJson("/api/competitive_programming");
  return j;
}

/**
 * chat(question)
 * Tries POST /api/chat, falls back to POST /api/query.
 * Returns { answer: string, links: string[] }.
 */
export async function chat(question) {
  if (!question || !String(question).trim()) {
    return { answer: "Please provide a question.", links: [] };
  }

  const payload = { question: String(question).trim() };

  // Try /api/chat first
  try {
    const res = await postJson("/api/chat", payload);
    return normalizeResponse(res);
  } catch (err) {
    // fallback to /api/query
    try {
      const res2 = await postJson("/api/query", payload);
      return normalizeResponse(res2);
    } catch (err2) {
      // return structured error so UI can show friendly message
      return {
        answer: `Error contacting backend: ${err2?.message || err?.message || "unknown error"}. Please check the Read Me or email hareekrishna.v.s@gmail.com`,
        links: [],
      };
    }
  }
}

/* default export for convenience */
export default {
  getAbout,
  getEducation,
  getProjects,
  getExperience,
  getCertificates,
  getCompetitive,
  chat,
};
