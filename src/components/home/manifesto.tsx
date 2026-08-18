const PILLARS = [
  {
    title: "Movement",
    body: "In-house calibers, hand-finished and regulated to chronometer standard before any case is closed.",
  },
  {
    title: "Material",
    body: "Grade 5 titanium, 904L steel, sapphire crystal — chosen for how they wear, not just how they photograph.",
  },
  {
    title: "Maison",
    body: "Founded on the belief that a watch should outlast the person who buys it, and be worn by the one who inherits it.",
  },
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="mx-auto grid w-full max-w-7xl scroll-mt-20 gap-10 px-6 py-20 sm:grid-cols-3 lg:px-10 lg:py-28"
    >
      {PILLARS.map((pillar) => (
        <div key={pillar.title} className="border-t border-hairline pt-6">
          <h2 className="font-serif text-xl text-foreground">{pillar.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone">{pillar.body}</p>
        </div>
      ))}
    </section>
  );
}
