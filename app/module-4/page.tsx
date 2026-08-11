"use client";

import Link from "next/link";
import { useState } from "react";

export default function Module4() {
  const [existingJan1, setExistingJan1] = useState("500");
  const [population, setPopulation] = useState("50000");
  const [newCases, setNewCases] = useState("100");
  const [deaths, setDeaths] = useState("50");

  const pop = parseFloat(population);
  const jan1 = parseFloat(existingJan1);
  const atRisk = pop - jan1;
  const nc = parseFloat(newCases);
  const d = parseFloat(deaths);

  const prevalenceJan1 = pop > 0 ? (jan1 / pop) * 100 : null;
  const incidence = atRisk > 0 ? (nc / atRisk) * 100 : null;
  const existingDec31 = jan1 - d + nc;
  const prevalenceDec31 = pop > 0 ? (existingDec31 / pop) * 100 : null;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        >
          &larr; Home
        </Link>

        <div className="mt-8 border-b border-hairline pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Module 4
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Disease Frequency
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            Before you can compare groups or test hypotheses, you need a way
            to count disease in a population in the first place. Incidence
            and prevalence answer two different questions &mdash; and
            confusing them changes what a number actually means.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Incidence</li>
            <li>Prevalence &amp; period prevalence</li>
            <li>Steady state</li>
            <li>Study design links</li>
          </ul>
        </div>

        {/* Definitions table */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Three measures, three questions
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-ink/[0.03] text-left font-mono text-xs uppercase tracking-wide text-slate">
                  <th className="px-4 py-3 font-medium">Measure</th>
                  <th className="px-4 py-3 font-medium">Formula</th>
                  <th className="px-4 py-3 font-medium">Captures</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Incidence
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    New cases &divide; population at risk at start
                  </td>
                  <td className="px-4 py-3">New disease occurrence</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Prevalence
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    Existing cases at one point &divide; total population
                    then
                  </td>
                  <td className="px-4 py-3">Disease burden as a snapshot</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Period prevalence
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    (Existing + new cases in a period) &divide; average
                    population
                  </td>
                  <td className="px-4 py-3">
                    Disease burden over a stretch of time
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-lg border border-hairline bg-ink/[0.02] p-4">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              The steady-state relationship
            </p>
            <p className="mt-2 font-mono text-sm text-ink">
              Prevalence &asymp; Incidence &times; Average Duration of
              Disease
            </p>
            <p className="mt-2 text-sm text-slate">
              Holds when a disease is in "steady state" &mdash; incidence
              and prevalence roughly constant over time.
            </p>
          </div>
        </section>

        {/* What changes prevalence without changing incidence */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            What moves prevalence without moving incidence?
          </h2>
          <div className="mt-6 space-y-3">
            <div className="rounded-lg border border-hairline p-4">
              <p className="text-sm text-ink">
                A new treatment that <strong>prolongs life</strong> without
                curing the disease &rarr; longer average duration &rarr;
                prevalence rises, incidence unchanged.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="text-sm text-ink">
                A faster cure, or a higher death rate from the disease
                &rarr; shorter average duration &rarr; prevalence falls,
                incidence unchanged.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="text-sm text-ink">
                Better diagnostic techniques finding previously undetected
                existing cases &rarr; apparent prevalence rises without any
                true change in disease occurrence.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive calculator, built around the real vignette */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Interactive calculator
          </h2>
          <p className="mt-2 text-slate">
            Change any value and watch the results update.
          </p>

          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-mono text-xs text-slate">
                  Total population
                </label>
                <input
                  type="number"
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                  className="mt-1 w-full rounded-md border border-hairline bg-paper px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-slate">
                  Existing cases, Jan 1
                </label>
                <input
                  type="number"
                  value={existingJan1}
                  onChange={(e) => setExistingJan1(e.target.value)}
                  className="mt-1 w-full rounded-md border border-hairline bg-paper px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-slate">
                  New cases during year
                </label>
                <input
                  type="number"
                  value={newCases}
                  onChange={(e) => setNewCases(e.target.value)}
                  className="mt-1 w-full rounded-md border border-hairline bg-paper px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-slate">
                  Deaths among Jan 1 cases
                </label>
                <input
                  type="number"
                  value={deaths}
                  onChange={(e) => setDeaths(e.target.value)}
                  className="mt-1 w-full rounded-md border border-hairline bg-paper px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 border-t border-hairline pt-6 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Prevalence, Jan 1
                </p>
                <p className="mt-1 font-mono text-xl text-teal">
                  {prevalenceJan1 === null
                    ? "\u2014"
                    : `${prevalenceJan1.toFixed(1)}%`}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Incidence, during year
                </p>
                <p className="mt-1 font-mono text-xl text-teal">
                  {incidence === null ? "\u2014" : `${incidence.toFixed(1)}%`}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Prevalence, Dec 31
                </p>
                <p className="mt-1 font-mono text-xl text-teal">
                  {prevalenceDec31 === null
                    ? "\u2014"
                    : `${prevalenceDec31.toFixed(1)}%`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Worked example, matching the actual deck vignette */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Worked example
          </h2>
          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              Clinical vignette
            </p>
            <p className="mt-3 text-sm text-ink">
              A city of 50,000 people has 500 people living with a chronic
              disease on January 1. During the year, 100 new cases are
              diagnosed among the 49,500 people without the disease. By
              December 31, 50 of the original patients have died and none
              have recovered.
            </p>
            <div className="mt-4 space-y-2 font-mono text-sm text-ink">
              <p>Prevalence (Jan 1): 500 / 50,000 = 1.0%</p>
              <p>Incidence (during year): 100 / 49,500 &asymp; 0.2%</p>
              <p>
                Existing cases Dec 31 = 500 &minus; 50 (deaths) + 100 (new)
                = 550
              </p>
              <p>Prevalence (Dec 31): 550 / 50,000 = 1.1%</p>
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-wide text-teal">
              Follow-up
            </p>
            <p className="mt-2 text-sm text-slate">
              The next year, a new drug is introduced that does not cure
              the disease but extends the average patient's life by
              several years, without changing how many new cases occur
              annually. What happens? Incidence stays the same &mdash; the
              same number of new cases still occur each year. Prevalence
              rises &mdash; existing cases now live longer, accumulating in
              the population instead of being removed by death.
            </p>
          </div>
        </section>

        {/* Policy applications */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Translating frequency into policy
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Prevalence &mdash; the "burden" metric
              </p>
              <p className="mt-2 text-sm text-ink">
                Tells officials how many people are currently sick.
                Drives budgeting for ongoing care, medications, dialysis
                machines, hospital beds, rehabilitation. A high prevalence
                of diabetes dictates investment in primary care and
                podiatry services.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Incidence &mdash; the "risk" metric
              </p>
              <p className="mt-2 text-sm text-ink">
                Tells officials how fast new cases are appearing. Triggers
                outbreak investigations, vaccination campaigns, quarantine
                measures. A sudden spike in measles incidence triggers
                school closures and emergency MMR catch-up clinics.
              </p>
            </div>
          </div>
        </section>

        {/* Study design link */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            How disease frequency dictates study design
          </h2>
          <p className="mt-2 text-slate">
            The type of frequency measure you can calculate determines
            which study design you're allowed to use &mdash; and which
            measure of association it can produce.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-ink/[0.03] text-left font-mono text-xs uppercase tracking-wide text-slate">
                  <th className="px-4 py-3 font-medium">Measure</th>
                  <th className="px-4 py-3 font-medium">Design allowed</th>
                  <th className="px-4 py-3 font-medium">Produces</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Incidence
                  </td>
                  <td className="px-4 py-3">
                    Cohort study or randomized controlled trial
                  </td>
                  <td className="px-4 py-3">
                    Relative Risk, Hazard Ratio, Attack Rate
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Prevalence
                  </td>
                  <td className="px-4 py-3">Cross-sectional study</td>
                  <td className="px-4 py-3">Prevalence Ratio</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate">
            In a case-control study, you start with people who already have
            the disease (cases) and people who don't (controls), then look
            backward at exposure. Because patients were selected based on
            their outcome, you can't calculate incidence &mdash; so the
            only valid measure of association is the{" "}
            <strong>Odds Ratio</strong>, not Relative Risk.
          </p>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/module-3"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Module 3
          </Link>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
