export default function Home({ goAsk, goRead }) {
  return (
    <div className="relative">
      {/* Hero gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,.25),transparent_60%)]" />

      <section className="container py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h1 className="title-1">வணக்கம்! / Vanakkam!</h1>
          <p className="text-lg text-neutral-300">
            I’m <span className="font-semibold">Hareekrishna V S</span>. Welcome to my personal portfolio & Q&amp;A.
          </p>

          <div className="card text-left space-y-3">
            <blockquote className="space-y-2">
              <p className="text-neutral-100">
                “கற்றது கைமண் அளவு, கல்லாதது உலகளவு.” — அவ்வையார்
              </p>
              <p className="muted text-sm">
                “What we have learned is a handful of sand; what we haven’t is the size of the world.” — Avvaiyar
              </p>
            </blockquote>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={goAsk} className="btn btn-primary">Ask Me</button>
            <button onClick={goRead} className="btn btn-ghost">Read Me</button>
          </div>

          <p className="text-xs muted">
            ⚠️ This portfolio is a work in progress. More details, images, and documents will be added.
          </p>
        </div>
      </section>
    </div>
  );
}
