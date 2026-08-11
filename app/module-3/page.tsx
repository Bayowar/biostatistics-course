"use client";

import Link from "next/link";
import { useState } from "react";

export default function Module3() {
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [lastFlip, setLastFlip] = useState<"H" | "T" | null>(null);
  const [flipping, setFlipping] = useState(false);

  const total = heads + tails;
  const pHeads = total === 0 ? null : heads / total;

  function flip() {
    setFlipping(true);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "H" : "T";
      setLastFlip(result);
      if (result === "H") setHeads((h) => h + 1);
      else setTails((t) => t + 1);
      setFlipping(false);
    }, 180);
  }

  function reset() {
    setHeads(0);
    setTails(0);
    setLastFlip(null);
  }

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
            Module 3
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Probability
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            The mathematical language for uncertainty &mdash; and the
            foundation every hypothesis test in this course quietly rests
            on.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Conditional probability</li>
            <li>Addition &amp; product rules</li>
            <li>Independence</li>
          </ul>
        </div>

        {/* Fundamentals */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Fundamentals
          </h2>
          <p className="mt-2 text-slate">
            Probability is always a number between 0 and 1: 0 means an event
            never happens, 1 means it always happens. Everything else in
            this module is about combining probabilities correctly.
          </p>
        </section>

        {/* Conditional probability & independence */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Conditional probability &amp; independence
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Conditional
              </p>
              <p className="mt-2 text-sm text-ink">
                P(A | B) &mdash; the probability of A, given that B has
                already happened. Knowing B changes what you'd expect for A.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Independent
              </p>
              <p className="mt-2 text-sm text-ink">
                Two events are independent when one happening tells you
                nothing about the other: P(A | B) = P(A).
              </p>
            </div>
          </div>
        </section>

        {/* Addition vs product rule */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Addition rule vs. product rule
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-ink/[0.03] text-left font-mono text-xs uppercase tracking-wide text-slate">
                  <th className="px-4 py-3 font-medium">Rule</th>
                  <th className="px-4 py-3 font-medium">Question it answers</th>
                  <th className="px-4 py-3 font-medium">Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Addition
                  </td>
                  <td className="px-4 py-3">
                    P(A or B) &mdash; either event happens
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    P(A) + P(B) &minus; P(A and B)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Product
                  </td>
                  <td className="px-4 py-3">
                    P(A and B) &mdash; both events happen
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    P(A) &times; P(B | A)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-mono text-xs text-slate">
            If A and B are independent, P(B | A) simplifies to just P(B).
          </p>
        </section>

        {/* Coin flip interactive */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Try it: flip a coin
          </h2>
          <p className="mt-2 text-slate">
            Each flip is a 50/50 event on its own. But watch what happens to
            the running probability of heads as you flip more times &mdash;
            it wanders early on, then settles in toward 0.5. That
            convergence is the law of large numbers in action.
          </p>

          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-6">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full border-2 border-teal font-display text-2xl font-semibold text-teal transition-transform ${
                    flipping ? "scale-90 opacity-50" : "scale-100"
                  }`}
                >
                  {lastFlip ?? "?"}
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-slate">
                    Heads / Tails
                  </p>
                  <p className="mt-1 font-mono text-lg text-ink">
                    {heads} / {tails}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-slate">
                    P(heads)
                  </p>
                  <p className="mt-1 font-mono text-lg text-teal">
                    {pHeads === null ? "\u2014" : pHeads.toFixed(3)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={flip}
                  disabled={flipping}
                  className="rounded-md bg-teal px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
                >
                  Flip Coin
                </button>
                <button
                  onClick={reset}
                  className="rounded-md border border-hairline px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-slate transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
                >
                  Reset
                </button>
              </div>
            </div>

            {total > 0 && (
              <div className="mt-6">
                <div className="h-2 w-full overflow-hidden rounded-full bg-hairline">
                  <div
                    className="h-full bg-teal transition-all duration-300"
                    style={{ width: `${(pHeads ?? 0) * 100}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-xs text-slate">
                  {total} flip{total === 1 ? "" : "s"} so far
                </p>
              </div>
            )}
          </div>
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
              In a clinic population, 30% of patients have hypertension
              (HTN), 20% have diabetes (DM), and 10% have both. What's the
              probability a randomly selected patient has HTN or DM?
            </p>
            <p className="mt-3 text-sm text-slate">
              These events overlap, so use the addition rule: P(HTN or DM) =
              P(HTN) + P(DM) &minus; P(HTN and DM) = 0.30 + 0.20 &minus;
              0.10 = <span className="font-mono text-ink">0.40</span>.
              Without subtracting the overlap, patients with both conditions
              would be double-counted.
            </p>
          </div>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/module-2"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Module 2
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
