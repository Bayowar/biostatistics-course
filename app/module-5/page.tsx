"use client";

import Link from "next/link";
import { useState } from "react";

export default function Module5() {
  const [a, setA] = useState("40");
  const [b, setB] = useState("960");
  const [c, setC] = useState("80");
  const [d, setD] = useState("920");

  const A = parseFloat(a);
  const B = parseFloat(b);
  const C = parseFloat(c);
  const D = parseFloat(d);

  const riskExposed = A + B > 0 ? A / (A + B) : null;
  const riskUnexposed = C + D > 0 ? C / (C + D) : null;

  const rr =
    riskExposed !== null && riskUnexposed !== null && riskUnexposed !== 0
      ? riskExposed / riskUnexposed
      : null;

  const or_ = B * C !== 0 ? (A * D) / (B * C) : null;

  const arr =
    riskExposed !== null && riskUnexposed !== null
      ? riskUnexposed - riskExposed
      : null;

  const nnt = arr !== null && arr !== 0 ? 1 / arr : null;

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
            Module 5
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Measures of Association
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            Once you can count disease, the next question is whether an
            exposure changes the risk of it &mdash; and by how much, in
            terms that actually mean something to a patient.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Relative Risk</li>
            <li>Odds Ratio</li>
            <li>ARR &amp; NNT</li>
            <li>NNH</li>
          </ul>
        </div>

        {/* Foundations table */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Five measures, at a glance
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-ink/[0.03] text-left font-mono text-xs uppercase tracking-wide text-slate">
                  <th className="px-4 py-3 font-medium">Measure</th>
                  <th className="px-4 py-3 font-medium">Formula</th>
                  <th className="px-4 py-3 font-medium">Used with</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Relative Risk
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    Risk(exposed) / Risk(unexposed)
                  </td>
                  <td className="px-4 py-3">Cohort studies, RCTs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Odds Ratio
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    (a &times; d) / (b &times; c)
                  </td>
                  <td className="px-4 py-3">Case-control studies</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Hazard Ratio
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    Hazard(group 1) / Hazard(group 2)
                  </td>
                  <td className="px-4 py-3">Survival / time-to-event</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    ARR
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    Risk(unexposed) &minus; Risk(exposed)
                  </td>
                  <td className="px-4 py-3">Any comparative study</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    NNT
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">1 / ARR</td>
                  <td className="px-4 py-3">Translating trial results</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-slate">
            RR and OR both describe the strength of an association, but
            only cohort/RCT designs can produce a true RR &mdash;
            case-control studies sample by outcome, so only OR is valid
            there (though OR approximates RR when the outcome is
            uncommon).
          </p>
        </section>

        {/* RR detail */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Relative Risk &mdash; "how many times"
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs text-teal">RR = 1.0</p>
              <p className="mt-1 text-sm text-ink">No association</p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs text-teal">RR &gt; 1.0</p>
              <p className="mt-1 text-sm text-ink">Risk factor</p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs text-teal">RR &lt; 1.0</p>
              <p className="mt-1 text-sm text-ink">Protective factor</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate">
            Key constraint: RR can only be calculated in cohort studies or
            RCTs, since it requires tracking incidence over time. You
            cannot calculate RR in a case-control study.
          </p>
        </section>

        {/* OR detail */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Odds Ratio &mdash; the cross-product
          </h2>
          <p className="mt-2 text-slate">
            The ratio of the odds of exposure among cases to the odds of
            exposure among controls. It's the only valid measure of
            association in a case-control study, because you sample based
            on outcome and can't calculate true risk.
          </p>
          <p className="mt-3 font-mono text-xs text-amber">
            USMLE rule: when the disease is rare (&lt;10%), the OR
            mathematically approximates the RR.
          </p>
        </section>

        {/* Interactive calculator */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Interactive calculator
          </h2>
          <p className="mt-2 text-slate">
            Enter any 2&times;2 table and watch RR, OR, ARR, and NNT
            recalculate. Loaded with the Drug X vignette below by default.
          </p>

          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <div className="overflow-hidden rounded-lg border border-hairline">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline bg-ink/[0.03] text-left font-mono text-xs uppercase tracking-wide text-slate">
                    <th className="px-4 py-2 font-medium"></th>
                    <th className="px-4 py-2 font-medium">Event</th>
                    <th className="px-4 py-2 font-medium">No event</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs uppercase tracking-wide text-teal">
                      Exposed
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        className="w-full rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        className="w-full rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs uppercase tracking-wide text-teal">
                      Unexposed
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={c}
                        onChange={(e) => setC(e.target.value)}
                        className="w-full rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={d}
                        onChange={(e) => setD(e.target.value)}
                        className="w-full rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  RR
                </p>
                <p className="mt-1 font-mono text-xl text-teal">
                  {rr === null ? "\u2014" : rr.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  OR
                </p>
                <p className="mt-1 font-mono text-xl text-teal">
                  {or_ === null ? "\u2014" : or_.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  ARR
                </p>
                <p className="mt-1 font-mono text-xl text-teal">
                  {arr === null ? "\u2014" : `${(arr * 100).toFixed(1)}%`}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  NNT
                </p>
                <p className="mt-1 font-mono text-xl text-teal">
                  {nnt === null || !isFinite(nnt)
                    ? "\u2014"
                    : Math.abs(nnt).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NNH */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Number Needed to Harm
          </h2>
          <p className="mt-2 text-slate">
            NNH = 1 / Attributable Risk, where Attributable Risk =
            Risk(exposed) &minus; Risk(unexposed). An NNH of 10 means for
            every 10 patients treated, you cause 1 harmful event &mdash;
            lower NNH means greater harm.
          </p>
          <p className="mt-3 font-mono text-xs text-amber">
            Teaching pearl: clinicians weigh NNT (benefit) against NNH
            (harm). If NNH is lower than NNT, the therapy may not be worth
            it.
          </p>
        </section>

        {/* Relative vs absolute */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Relative vs. absolute &mdash; the golden rule
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Relative (RR, OR, HR)
              </p>
              <p className="mt-2 text-sm text-ink">
                Ratios. Stable across populations with different baseline
                risks, but can exaggerate perceived impact &mdash; "50%
                reduction" sounds dramatic regardless of the starting
                risk.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Absolute (ARR, NNT)
              </p>
              <p className="mt-2 text-sm text-ink">
                Differences. Directly applicable to patient decisions, but
                depend on baseline disease prevalence.
              </p>
            </div>
          </div>
          <p className="mt-4 font-mono text-xs text-amber">
            Never report a Relative Risk without also reporting the ARR or
            NNT. When you hear a relative risk, ask: "absolute risk
            reduction of what?"
          </p>
        </section>

        {/* Worked example */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Worked example
          </h2>
          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              Clinical vignette
            </p>
            <p className="mt-3 text-sm text-ink">
              A randomized trial assigns 1,000 patients to Drug X and 1,000
              to placebo for MI prevention. Over 5 years: 40 MIs occur in
              the Drug X group and 80 MIs occur in the placebo group.
            </p>
            <div className="mt-4 space-y-1 font-mono text-sm text-ink">
              <p>RR = (40/1000) / (80/1000) = 0.50</p>
              <p>ARR = 8.0% &minus; 4.0% = 4.0%</p>
              <p>NNT = 1 / ARR = 25</p>
              <p>OR = (40 &times; 920) / (960 &times; 80) = 0.48</p>
            </div>
            <p className="mt-4 text-sm text-slate">
              Treat 25 patients for 5 years to prevent one additional MI.
              OR approximates RR here because the outcome is relatively
              uncommon.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wide text-teal">
              Framing it for a patient
            </p>
            <p className="mt-2 text-sm text-slate">
              "If 25 patients like you take this medication for 5 years,
              on average one additional heart attack will be prevented.
              The other 24 will see no difference from the drug itself
              &mdash; but none of us knows in advance which patient that
              will be."
            </p>
          </div>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/module-4"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Module 4
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
