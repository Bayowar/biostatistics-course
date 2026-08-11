"use client";

import Link from "next/link";
import { useState } from "react";

const LEVELS = [
  {
    key: "nominal",
    label: "Nominal",
    qualifier: "Qualitative · no order",
    example: "Racial/ethnic category",
    detail:
      "Categories with no inherent order or numeric meaning — labels only. You can count them, but you can't rank or average them.",
  },
  {
    key: "ordinal",
    label: "Ordinal",
    qualifier: "3+ ranked categories",
    example: "Self-rated health status",
    detail:
      "Categories have a meaningful order, but the gaps between them aren't necessarily equal. \u201cGood\u201d isn't a fixed distance from \u201cFair.\u201d",
  },
  {
    key: "interval",
    label: "Interval",
    qualifier: "Continuous, no true zero",
    example: "Fahrenheit temperature",
    detail:
      "Equal intervals between values, but zero doesn't mean \u201cnone\u201d — so ratios aren't meaningful. 40\u00b0F isn't \u201ctwice\u201d as hot as 20\u00b0F.",
  },
  {
    key: "ratio",
    label: "Ratio",
    qualifier: "Continuous, true zero",
    example: "Kelvin temperature",
    detail:
      "Equal intervals and a true zero point — so ratios are meaningful. 200K really is twice the thermal energy of 100K.",
  },
] as const;

export default function Module1() {
  const [active, setActive] = useState<(typeof LEVELS)[number]["key"]>(
    "nominal"
  );
  const activeLevel = LEVELS.find((l) => l.key === active)!;
  const activeIndex = LEVELS.findIndex((l) => l.key === active);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        >
          &larr; Home
        </Link>

        {/* Header */}
        <div className="mt-8 border-b border-hairline pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Module 1
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Introduction
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            Before any test or formula, biostatistics starts with a
            question: what kind of information are you actually holding?
            This module sets the vocabulary everything else builds on.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Nominal measurement</li>
            <li>Qualitative vs. quantitative</li>
            <li>Levels of measurement</li>
          </ul>
        </div>

        {/* Statistics vs Biostatistics */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            One discipline, two names
          </h2>
          <p className="mt-2 text-slate">
            Biostatistics is applied statistics: systematic information
            gathering and quantitative data analysis, aimed at questions in
            public health and medicine.
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-ink/[0.03] text-left font-mono text-xs uppercase tracking-wide text-slate">
                  <th className="px-4 py-3 font-medium">Epidemiology term</th>
                  <th className="px-4 py-3 font-medium">Biostatistics term</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-3">Exposure / risk factor</td>
                  <td className="px-4 py-3">Predictor / independent variable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Outcome</td>
                  <td className="px-4 py-3">Dependent variable</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-mono text-xs text-slate">
            Same concepts, different fields — used interchangeably in the
            literature.
          </p>
        </section>

        {/* Qualitative vs Quantitative */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Qualitative vs. quantitative
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Qualitative
              </p>
              <p className="mt-2 text-sm text-ink">
                No numeric value or rank. Describes a quality or category.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Quantitative
              </p>
              <p className="mt-2 text-sm text-ink">
                A numeric value is ascribed. Can be measured or counted.
              </p>
            </div>
          </div>
        </section>

        {/* Discrete vs Continuous */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Discrete vs. continuous
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Discrete
              </p>
              <p className="mt-2 text-sm text-ink">
                A finite or countable number of values.
              </p>
              <p className="mt-3 font-mono text-xs text-slate">
                e.g. # missing teeth in a dental patient
              </p>
              <p className="mt-1 font-mono text-xs text-slate">
                Dichotomous/binary: exactly 2 categories, e.g. alive / dead
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Continuous
              </p>
              <p className="mt-2 text-sm text-ink">
                An infinite number of values on a continuum.
              </p>
              <p className="mt-3 font-mono text-xs text-slate">
                e.g. height
              </p>
            </div>
          </div>
        </section>

        {/* Signature interactive: The Measurement Scale */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            The measurement scale
          </h2>
          <p className="mt-2 text-slate">
            Levels of measurement aren't just four categories — they're a
            hierarchy of increasing information. Each level to the right
            keeps everything the one before it could tell you, and adds
            more. Tap each one.
          </p>

          {/* Scale track */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-hairline" />
              <div className="relative grid grid-cols-4 gap-2">
                {LEVELS.map((level, i) => {
                  const isActive = level.key === active;
                  return (
                    <button
                      key={level.key}
                      onClick={() => setActive(level.key)}
                      aria-pressed={isActive}
                      className="group flex flex-col items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
                    >
                      <span
                        className={`h-3 w-3 rounded-full border-2 transition-colors ${
                          isActive
                            ? "border-teal bg-teal"
                            : i <= activeIndex
                            ? "border-teal bg-paper"
                            : "border-hairline bg-paper"
                        }`}
                      />
                      <span
                        className={`font-mono text-xs uppercase tracking-wide transition-colors ${
                          isActive ? "text-teal" : "text-slate group-hover:text-ink"
                        }`}
                      >
                        {level.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="mt-8 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-semibold">
                {activeLevel.label}
              </h3>
              <span className="font-mono text-xs text-slate">
                {activeLevel.qualifier}
              </span>
            </div>
            <p className="mt-3 text-sm text-ink">{activeLevel.detail}</p>
            <p className="mt-4 font-mono text-xs text-amber">
              Example — {activeLevel.example}
            </p>
          </div>
        </section>

        {/* Footer nav */}
        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Home
          </Link>
          <span className="font-mono text-xs uppercase tracking-wide text-slate">
            Next: Module 2 &middot; Distributions
          </span>
        </div>
      </div>
    </main>
  );
}
