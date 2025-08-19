import { useEffect, useState, memo } from "react";
import {
  getAbout,
  getEducation,
  getProjects,
  getExperience,
  getCertificates,
  getCompetitive,
  // optional: if you have /api/pending_updates uncomment the line and the fetch below
  // getPendingUpdates,
} from "../lib/api";

/* --- Tiny UI helpers --- */
const SectionCard = ({ title, children }) => (
  <section className="rounded-2xl bg-zinc-900/60 p-6 shadow-lg ring-1 ring-zinc-800">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{title}</h2>
    {children}
  </section>
);

const Badge = memo(({ children }) => (
  <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 ring-1 ring-zinc-700">
    {children}
  </span>
));

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-zinc-800/60 ${className}`} />
);

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState(null);
  const [education, setEducation] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certs, setCerts] = useState([]);
  const [competitive, setCompetitive] = useState([]);
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const promises = [
          getAbout(),
          getEducation(),
          getProjects(),
          getExperience(),
          getCertificates(),
          getCompetitive(),
          // getPendingUpdates(), // <- optional if you have this endpoint
        ];
        const [a, e, p, x, c, cp /*, pend */] = await Promise.all(promises);
        setAbout(a);
        setEducation(e);
        setProjects(p);
        setExperience(x);
        setCerts(c);
        setCompetitive(cp);
        // setPending(pend); // optional
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-10 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-10 text-rose-400">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* Banner (only if pending updates exist) */}
      {(pending?.notes?.length || true) && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-900/10 p-4 text-sm text-amber-200">
          ℹ️ More information, images, links, and documents will be updated soon.
        </div>
      )}

      {/* About */}
      <SectionCard title="About">
        {about?.summary ? (
          <pre className="whitespace-pre-wrap text-sm text-zinc-300">{about.summary}</pre>
        ) : (
          <div className="text-sm text-zinc-400">No about info yet.</div>
        )}
      </SectionCard>

      {/* Education */}
      <SectionCard title="Education">
        {education?.summary ? (
          <pre className="whitespace-pre-wrap text-sm text-zinc-300">{education.summary}</pre>
        ) : (
          <div className="text-sm text-zinc-400">No education details yet.</div>
        )}
      </SectionCard>

      {/* Experience (timeline-ish) */}
      <SectionCard title="Experience">
        {experience?.length ? (
          <ul className="space-y-6">
            {experience.map((e, i) => (
              <li key={i} className="relative pl-5">
                {/* timeline line + dot */}
                <div className="absolute left-0 top-2 h-full w-px bg-zinc-800" aria-hidden />
                <div className="absolute -left-[3px] top-2 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />

                <div className="rounded-xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-semibold text-zinc-100">{e.organization}</div>
                    {e.location && <span className="text-xs text-zinc-400">· {e.location}</span>}
                  </div>

                  {!!e.roles?.length && (
                    <ul className="mt-2 list-disc pl-6 text-sm text-zinc-300">
                      {e.roles.map((r, idx) => <li key={idx}>{r}</li>)}
                    </ul>
                  )}

                  {!!e.responsibilities?.length && (
                    <ul className="mt-3 list-disc pl-6 text-sm text-zinc-300">
                      {e.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-zinc-400">No experience added yet.</div>
        )}
      </SectionCard>

      {/* Projects */}
      <SectionCard title="Projects">
        {projects?.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p, i) => (
              <div key={i} className="rounded-xl bg-zinc-900 p-4 ring-1 ring-zinc-800">
                <div className="font-semibold text-zinc-100">{p.project_name}</div>
                {p.description && (
                  <div className="mt-1 text-sm text-zinc-300">{p.description}</div>
                )}

                {!!p.technologies?.length && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.technologies.map((t, idx) => <Badge key={idx}>{t}</Badge>)}
                  </div>
                )}

                {p.status && (
                  <div className="mt-2">
                    <Badge>Status: {p.status}</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-zinc-400">No projects yet.</div>
        )}
      </SectionCard>

      {/* Certificates & Competitive Programming */}
      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Certificates">
          {certs?.length ? (
            <ul className="list-disc pl-6 text-sm text-zinc-300">
              {certs.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          ) : (
            <div className="text-sm text-zinc-400">No certificates listed.</div>
          )}
        </SectionCard>

        <SectionCard title="Competitive Programming">
          {competitive?.length ? (
            <ul className="list-disc pl-6 text-sm text-zinc-300">
              {competitive.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          ) : (
            <div className="text-sm text-zinc-400">No platforms added.</div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
