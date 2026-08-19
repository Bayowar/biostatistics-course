"use client";

import Link from "next/link";
import { useState } from "react";

export default function Module6() {
  // Sensitivity/specificity calculator
  const [ta, setTa] = useState("90");
  const [tb, setTb] = useState("90");
  const [tc, setTc] = useState("10");
  const [td, setTd] = useState("810");

  const A = parseFloat(ta);
  const B = parseFloat(tb);
  const C = parseFloat(tc);
  const D = parseFloat(td);

  const sens = A + C > 0 ? A / (A + C) : null;
  const spec = B + D > 0 ? D / (B + D) : null;
  const ppv = A + B > 0 ? A / (A + B) : null;
  const npv = C + D > 0 ? D / (C + D) : null;
  const accuracy = A + B + C + D > 0 ? (A + D) / (A + B + C + D) : null;

  // Bayes calculator
  const [prevalence, setPrevalence] = useState("5");
  const [lrPos, setLrPos] = useState("5");

  const p = parseFloat(prevalence) / 100;
  const lr = parseFloat(lrPos);
  const preOdds = p < 1 ? p / (1 - p) : null;
  const postOdds = preOdds !== null ? preOdds * lr : null;
  const postProb = postOdds !== null ? postOdds / (1 + postOdds) : null;

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
            Module 6
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Testing &amp; Screening
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            No test is perfect. This module covers how to judge a test's
            quality, and how to update your belief about a diagnosis once
            a result comes back.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Sensitivity &amp; specificity</li>
            <li>Likelihood ratios</li>
            <li>Bayes&rsquo; theorem</li>
            <li>ROC curves</li>
          </ul>
        </div>

        {/* Validity vs reliability */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Validity vs. reliability
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Validity / accuracy
              </p>
              <p className="mt-2 text-sm text-ink">
                Does the test measure what it's supposed to measure? Are
                results close to the true value?
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Reliability / consistency
              </p>
              <p className="mt-2 text-sm text-ink">
                Does the test give the same result on repeat measurement?
                A test can be reliable without being valid.
              </p>
            </div>
          </div>
        </section>

        {/* Screening vs diagnostic */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Screening vs. diagnostic testing
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Screening
              </p>
              <p className="mt-2 text-sm text-ink">
                Medical surveillance in people without symptoms. Assesses
                disease likelihood but does not diagnose: a positive
                result merits further diagnostic workup.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Diagnostic
              </p>
              <p className="mt-2 text-sm text-ink">
                The post-screening procedure that investigates symptoms or
                abnormalities to actually diagnose illness.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate">
            Criteria for a good screening test: the disease causes
            substantial death or disability, early detection improves
            outcomes, testing is feasible, and it's acceptable to patients
            given its harms and costs.
          </p>
        </section>

        {/* Lead-time and length-time bias */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Two screening biases
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Lead-time bias
              </p>
              <p className="mt-2 text-sm text-ink">
                Screening detects disease earlier, making survival time
                from diagnosis look longer: even if the patient
                dies at the same actual time, and the screening changed
                nothing.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Length-time bias
              </p>
              <p className="mt-2 text-sm text-ink">
                Screening disproportionately catches slow-growing,
                less-aggressive disease, making screen-detected cases look
                like they have better outcomes than they really represent.
              </p>
            </div>
          </div>
        </section>

        {/* Sens/Spec calculator */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Interactive calculator: sensitivity &amp; specificity
          </h2>
          <p className="mt-2 text-slate">
            Enter a 2&times;2 test-result table and watch sensitivity,
            specificity, PPV, and NPV recalculate.
          </p>

          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <div className="overflow-hidden rounded-lg border border-hairline">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline bg-ink/[0.03] text-left font-mono text-xs uppercase tracking-wide text-slate">
                    <th className="px-4 py-2 font-medium"></th>
                    <th className="px-4 py-2 font-medium">Disease +</th>
                    <th className="px-4 py-2 font-medium">Disease &minus;</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs uppercase tracking-wide text-teal">
                      Test +
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={ta}
                        onChange={(e) => setTa(e.target.value)}
                        className="w-full rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={tb}
                        onChange={(e) => setTb(e.target.value)}
                        className="w-full rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-xs uppercase tracking-wide text-teal">
                      Test &minus;
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={tc}
                        onChange={(e) => setTc(e.target.value)}
                        className="w-full rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={td}
                        onChange={(e) => setTd(e.target.value)}
                        className="w-full rounded-md border border-hairline bg-paper px-3 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Sens.
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  {sens === null ? "\u2014" : `${(sens * 100).toFixed(1)}%`}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Spec.
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  {spec === null ? "\u2014" : `${(spec * 100).toFixed(1)}%`}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  PPV
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  {ppv === null ? "\u2014" : `${(ppv * 100).toFixed(1)}%`}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  NPV
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  {npv === null ? "\u2014" : `${(npv * 100).toFixed(1)}%`}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Accuracy
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  {accuracy === null
                    ? "\u2014"
                    : `${(accuracy * 100).toFixed(1)}%`}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate">
            Try lowering prevalence (fewer disease-positive columns
            relative to disease-negative) while keeping sensitivity and
            specificity fixed: watch PPV drop even though the test
            itself didn't change. That's the effect of disease rates on
            predictive value.
          </p>
        </section>

        {/* Likelihood ratios */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Likelihood ratios
          </h2>
          <p className="mt-2 text-slate">
            A likelihood ratio tells you how much a test result should
            shift your belief about disease probability.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                LR+ (positive result)
              </p>
              <p className="mt-2 font-mono text-sm text-ink">
                sensitivity / (1 &minus; specificity)
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                LR&minus; (negative result)
              </p>
              <p className="mt-2 font-mono text-sm text-ink">
                (1 &minus; sensitivity) / specificity
              </p>
            </div>
          </div>
        </section>

        {/* Bayes' theorem, stated explicitly */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Bayes&rsquo; theorem
          </h2>
          <p className="mt-2 text-slate">
            Likelihood ratios are Bayes&rsquo; theorem in disguise.
            Written out in full, for a positive test result D given
            disease status +:
          </p>
          <div className="mt-6 rounded-lg border border-hairline p-5">
            <p className="font-mono text-sm text-ink">
              P(+ | D) = [P(D | +) &times; P(+)] &divide; P(D)
            </p>
            <p className="mt-3 text-sm text-slate">
              P(+) is the pretest probability (usually prevalence).
              P(D | +) is the sensitivity. P(D) is the overall
              probability of testing positive, across both diseased and
              non-diseased patients. The output, P(+ | D), is the
              posttest probability &mdash; your updated belief after
              seeing the result.
            </p>
          </div>
          <p className="mt-4 text-sm text-slate">
            In practice, restating this in <strong>odds</strong> form is
            faster to compute by hand: posttest odds = pretest odds
            &times; likelihood ratio. That&rsquo;s exactly what the
            calculator below does &mdash; it&rsquo;s Bayes&rsquo;
            theorem, just in a form built for quick bedside math instead
            of the probability form above.
          </p>
        </section>

        {/* Bayes calculator */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Interactive calculator: pretest &rarr; posttest probability
          </h2>
          <p className="mt-2 text-slate">
            Enter a pretest probability (usually disease prevalence) and a
            positive likelihood ratio to see how much a positive test
            result should update your belief.
          </p>

          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-mono text-xs text-slate">
                  Pretest probability (%)
                </label>
                <input
                  type="number"
                  value={prevalence}
                  onChange={(e) => setPrevalence(e.target.value)}
                  className="mt-1 w-full rounded-md border border-hairline bg-paper px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-slate">
                  Positive LR
                </label>
                <input
                  type="number"
                  value={lrPos}
                  onChange={(e) => setLrPos(e.target.value)}
                  className="mt-1 w-full rounded-md border border-hairline bg-paper px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Pretest odds
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  {preOdds === null ? "\u2014" : preOdds.toFixed(3)}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Posttest odds
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  {postOdds === null ? "\u2014" : postOdds.toFixed(3)}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Posttest probability
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  {postProb === null
                    ? "\u2014"
                    : `${(postProb * 100).toFixed(1)}%`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Practice questions */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Practice questions
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-amber">
                Question 1
              </p>
              <p className="mt-2 text-sm text-ink">
                You think your patient, TJ, has lung cancer. TJ's pretest
                P(lung cancer) is 5%. A new test has a positive likelihood
                ratio of 5. TJ tests positive. What's his post-test
                P(lung cancer)?
              </p>
              <p className="mt-3 font-mono text-xs text-teal">
                Answer: pretest odds 0.05/0.95 &asymp; 0.053; posttest odds
                = 0.053 &times; 5 &asymp; 0.263; posttest probability =
                0.263 / 1.263 &asymp; 20.8%
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-amber">
                Question 2
              </p>
              <p className="mt-2 text-sm text-ink">
                Shakeria has a serum ferritin of 60 mmol/L. 90% of patients
                with iron deficiency anemia have ferritin in this range
                (sensitivity). 15% of patients with anemia from other
                causes also fall in this range (1 &minus; specificity).
                What's Shakeria's positive likelihood ratio?
              </p>
              <p className="mt-3 font-mono text-xs text-teal">
                Answer: LR+ = sensitivity / (1 &minus; specificity) = 0.90
                / 0.15 = 6.0
              </p>
            </div>
          </div>
        </section>

        {/* ROC curves */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            ROC curves
          </h2>
          <p className="mt-2 text-slate">
            A Receiver Operating Characteristic curve plots sensitivity
            against 1 &minus; specificity across every possible test
            threshold. The Area Under the Curve (AUC) summarizes overall
            test performance in a single number, from 0 to 1.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="w-32 px-4 py-3 font-mono text-xs text-teal">
                    0.5
                  </td>
                  <td className="px-4 py-3">No discriminatory ability</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-teal">
                    0.7 &ndash; 0.8
                  </td>
                  <td className="px-4 py-3">Acceptable discrimination</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-teal">
                    0.8 &ndash; 0.9
                  </td>
                  <td className="px-4 py-3">Excellent discrimination</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-teal">
                    0.9+
                  </td>
                  <td className="px-4 py-3">Outstanding discrimination</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/module-5"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Module 5
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
