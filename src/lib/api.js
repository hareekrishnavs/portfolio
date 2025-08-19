const BASE_URL =
  import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") ||
  "https://haree2226-hareekrishnavs-portfolio-backend.hf.space";

async function j(resp) {
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`API ${resp.status}: ${text}`);
  }
  return resp.json();
}

export async function getAbout() { return j(await fetch(`${BASE_URL}/api/about`)); }
export async function getEducation() { return j(await fetch(`${BASE_URL}/api/education`)); }
export async function getProjects() { return j(await fetch(`${BASE_URL}/api/projects`)); }
export async function getExperience() { return j(await fetch(`${BASE_URL}/api/experience`)); }
export async function getCertificates() { return j(await fetch(`${BASE_URL}/api/certificates`)); }
export async function getCompetitive() { return j(await fetch(`${BASE_URL}/api/competitive_programming`)); }

export async function chat(question) {
  try {
    return await j(await fetch(`${BASE_URL}/api/chat`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    }));
  } catch {
    return await j(await fetch(`${BASE_URL}/api/query`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    }));
  }
}
