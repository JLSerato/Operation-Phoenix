import React, { useEffect, useMemo, useState } from "react";

const iconBase =
  "h-10 w-10 shrink-0 rounded-full border border-neutral-800 bg-neutral-900/90 text-neutral-100 flex items-center justify-center shadow-inner";

const icons = {
  status: (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M5 12l4 4m-4-4l4-4M12 5l4 4m-4-4l-4 4M12 19l4-4m-4 4l-4-4" />
    </svg>
  ),
  bottleneck: (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path d="M12 3v5l3 3-3 3v7m0-7l-3 3 3 3" />
      <path d="M5 15h14" />
    </svg>
  ),
  excellence: (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path d="M12 3l2.2 4.46 4.92.72-3.56 3.47.84 4.9L12 14.77l-4.4 2.31.84-4.9L4.88 8.18l4.92-.72L12 3z" />
    </svg>
  ),
  roi: (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path d="M5 17l4-4 3 3 7-7" />
      <path d="M19 7h-4V3" />
    </svg>
  ),
};

const defaultSections = [
  {
    key: "status",
    title: "Status Quo",
    icon: "status",
    accent: "border-neutral-200 bg-white",
    points: [
      "Uneinheitliche Rezepturen, schwankende Drink-Qualität",
      "Wenig Struktur im Mise en Place während Peak-Zeiten",
      "Geringe Sichtbarkeit der Upsell-Performance",
    ],
  },
  {
    key: "bottleneck",
    title: "Flaschenhälse",
    icon: "bottleneck",
    accent: "border-amber-500/70 bg-amber-50",
    points: [
      "Bar-Runner ist Engpass bei Gläsern & Garnish",
      "Kassen-Workflows bremsen Zusatzverkäufe aus",
      "Keine klare Eskalation bei Lieferverzögerungen",
    ],
  },
  {
    key: "excellence",
    title: "Exzellenz-Lösung",
    icon: "excellence",
    accent: "border-neutral-800 bg-neutral-950 text-neutral-100",
    points: [
      "Signature Flight mit Storytelling & Visual Menu",
      "Digitale Mise-en-Place-Liste inkl. IoT-Temperaturcheck",
      "Crew Briefings via Tablet, Gamification fürs Upselling",
    ],
  },
  {
    key: "roi",
    title: "ROI / Impact",
    icon: "roi",
    accent: "border-emerald-500/60 bg-emerald-50",
    points: [
      "+12 % Deckungsbeitrag in 90 Tagen",
      "Servicezeit -18 % dank Prep-Automatisierung",
      "NPS der Bar-Gäste +15 Punkte",
    ],
  },
];

const SectionCard = ({ section }) => {
  const Icon = icons[section.icon];

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${section.accent}`}
    >
      <div className="mb-5 flex items-center gap-4">
        <span className={iconBase}>{Icon}</span>
        <h3 className="text-lg font-semibold tracking-wide uppercase text-neutral-900 group-[.border-neutral-800]:text-neutral-100">
          {section.title}
        </h3>
      </div>
      <ul className="space-y-2 text-sm leading-relaxed text-neutral-600 group-[.border-neutral-800]:text-neutral-200">
        {section.points.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-neutral-800 group-[.border-neutral-800]:bg-neutral-200" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default function BarDetailModal({
  sections = defaultSections,
  triggerLabel = "BAR",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const memoizedSections = useMemo(
    () => sections.map((section) => ({ ...section, icon: section.icon ?? "status" })),
    [sections]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-900 transition hover:bg-neutral-900 hover:text-neutral-50"
      >
        {triggerLabel}
        <span className="text-xs font-normal tracking-normal text-neutral-500">Insights öffnen</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-12">
          <div
            className="absolute inset-0 bg-neutral-900/70 backdrop-blur"
            aria-hidden="true"
            onClick={close}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-4xl bg-white shadow-[0_40px_90px_rgba(15,23,42,0.45)]"
          >
            <header className="flex items-start justify-between bg-neutral-950 px-8 py-6 text-neutral-50">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Optimierungsprozesse · Bar</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-wider uppercase">Detail-Insights</h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-neutral-700/80 p-2 text-neutral-300 transition hover:bg-neutral-800 hover:text-neutral-100"
                aria-label="Dialog schließen"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </header>

            <section className="grid gap-6 bg-neutral-50 px-8 py-8 sm:grid-cols-2">
              {memoizedSections.map((section) => (
                <SectionCard key={section.key} section={section} />
              ))}
            </section>

            <footer className="flex flex-col gap-3 border-t border-neutral-200 bg-white px-8 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
              <span>Alle Kennzahlen basieren auf dem aktuellen 90-Tage-Optimierungszyklus.</span>
              <button
                type="button"
                onClick={close}
                className="self-start rounded-full border border-neutral-900 px-5 py-2 font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:bg-neutral-900 hover:text-neutral-50"
              >
                Schließen
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
