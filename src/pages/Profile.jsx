import React from "react";
import profileData from "../data/profileData.json";

function previewLink(url) {
  if (!url || typeof url !== "string") return url;
  url = url.trim();

  const ghBlob = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.*)$/);
  if (ghBlob) {
    const [, user, repo, path] = ghBlob;
    return `https://raw.githubusercontent.com/${user}/${repo}/${path}`;
  }
  if (url.startsWith("https://raw.githubusercontent.com/")) return url;
  if (url.includes(".github.io/")) return url;

  const gdrive1 = url.match(/\/d\/([a-zA-Z0-9_-]+)(\/|$)/);
  const gdrive2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const gId = (gdrive1 && gdrive1[1]) || (gdrive2 && gdrive2[1]);
  if (gId) return `https://drive.google.com/file/d/${gId}/preview`;

  if (url.includes("dropbox.com")) {
    if (url.includes("?dl=0")) return url.replace("?dl=0", "?raw=1");
    if (url.includes("?dl=1")) return url.replace("?dl=1", "?raw=1");
    return url;
  }

  if (url.includes("/blob/") && url.includes("github.com/")) {
    return url.replace("github.com/", "raw.githubusercontent.com/").replace("/blob/", "/");
  }
  return url;
}


const Section = ({ title, children, className = "" }) => (
  <section className={`rounded-2xl bg-zinc-900/60 p-6 shadow-sm ring-1 ring-zinc-800 ${className}`}>
    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100 mb-4">{title}</h2>
    {children}
  </section>
);

const BodyText = ({ children }) => (
  <div className="text-base text-zinc-300 leading-relaxed whitespace-pre-line">{children}</div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200 ring-1 ring-zinc-700">
    {children}
  </span>
);

const ActionLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-indigo-600 hover:text-white transition">
    {children}
  </a>
);


export default function Profile() {
  const {
    about_me,
    education,
    projects = [],
    certificates = [],
    competitive = [],
    experience = [],
  } = profileData;

  return (
    <div className="font-sans container mx-auto max-w-6xl px-4 py-10 space-y-10 text-zinc-300">
      <header>
        <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100">Hareekrishna V S</h1>
        <p className="mt-1 text-lg text-zinc-400">Backend Developer · Machine Learning & Deep Learning Enthusiast</p>
      </header>

      <Section title="About">
        <BodyText>{about_me?.summary || "—"}</BodyText>
      </Section>

      <Section title="Education">
        {education?.summary ? (
          <BodyText>{education.summary}</BodyText>
        ) : (
          <div className="space-y-4">
            {Array.isArray(education) && education.length > 0 ? (
              education.map((edu, i) => (
                <div key={i} className="rounded-xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
                  <div className="text-lg font-semibold text-zinc-100">{edu.organization}</div>
                  <div className="text-sm text-zinc-400">{edu.degree || edu.course || ""} {edu.duration ? `· ${edu.duration}` : ""}</div>

                  {edu.gpa && <div className="mt-2 text-sm text-zinc-300">GPA: {edu.gpa}</div>}

                  {edu.volunteering?.length ? (
                    <div className="mt-3">
                      <div className="text-sm text-zinc-400 mb-1">Volunteering</div>
                      <ul className="list-disc pl-6 text-base text-zinc-300 space-y-1">
                        {edu.volunteering.map((v, idx) => <li key={idx}>{v}</li>)}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <BodyText>No education details available.</BodyText>
            )}
          </div>
        )}
      </Section>

      <Section title="Experience">
        {experience.length > 0 ? (
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <article key={idx} className="rounded-xl bg-zinc-900 p-5 ring-1 ring-zinc-800">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold text-zinc-100">{exp.organization}</div>
                    {exp.location && <div className="text-sm text-zinc-400">{exp.location}</div>}
                    {exp.roles?.length ? (
                      <div className="mt-2">
                        {exp.roles.map((r, i) => (
                          <div key={i} className="text-sm text-zinc-200">
                            <span className="font-medium">{r.split(":")[0] || r}</span>
                            {r.includes(":") ? <span className="text-zinc-400"> {r.split(":").slice(1).join(":")}</span> : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2">
                    {exp.links?.[0] ? (
                      <a href={previewLink(exp.links[0])} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-200 hover:text-white">
                        Certificate
                      </a>
                    ) : null}
                  </div>
                </div>

                {exp.responsibilities?.length ? (
                  <ul className="mt-4 list-disc pl-6 text-base text-zinc-300 space-y-1">
                    {exp.responsibilities.map((r, i3) => <li key={i3}>{r}</li>)}
                  </ul>
                ) : null}

                {exp.technologies?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((t, k) => <Badge key={k}>{t}</Badge>)}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <BodyText>No experience listed yet.</BodyText>
        )}
      </Section>

      <Section title="Projects">
        {projects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p, i) => {
              const link = (p.Link && p.Link[0]) || (p.links && p.links[0]) || p.github || null;
              return (
                <div key={i} className="rounded-xl bg-zinc-900 p-5 ring-1 ring-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="text-lg font-semibold text-zinc-100">{p.project_name}</div>
                    {p.description && <div className="mt-2 text-base text-zinc-300">{p.description}</div>}
                    {!!p.technologies?.length && <div className="mt-3 flex flex-wrap gap-2">{p.technologies.map((t, k) => <Badge key={k}>{t}</Badge>)}</div>}
                  </div>

                  <div className="mt-4 flex justify-end">
                    {link ? <ActionLink href={previewLink(link)}>View GitHub</ActionLink> : <div className="text-xs text-zinc-500">No repo link</div>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <BodyText>No projects yet.</BodyText>
        )}
      </Section>

      <Section title="Continuing Education">
        {certificates.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.map((c, i) => {
              const raw = c.Link?.[0] || c.link || null;
              const title = c.Topic || c.title || c;
              return (
                <div key={i} className="rounded-xl bg-zinc-900 p-4 ring-1 ring-zinc-800 flex items-center justify-between">
                  <div className="text-base text-zinc-300 font-medium">{title}</div>
                  {raw ? <a href={previewLink(raw)} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-200 hover:text-white">Open</a> : <div className="text-xs text-zinc-500">No link</div>}
                </div>
              );
            })}
          </div>
        ) : (
          <BodyText>No certificates listed.</BodyText>
        )}

        {Array.isArray(competitive) && competitive.length > 0 && (
          <div className="mt-6">
            <div className="text-base text-zinc-400 mb-3">Competitive Programming</div>
            <div className="flex flex-wrap gap-2">
              {competitive.map((c, i) => <Badge key={i}>{c}</Badge>)}
            </div>
          </div>
        )}
      </Section>

      <footer className="text-center text-sm text-zinc-500">Portfolio content & links are being updated.</footer>
    </div>
  );
}
