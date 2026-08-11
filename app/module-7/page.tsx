"use client";

import Link from "next/link";

export default function Module7() {
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
            Module 7
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Hypothesis Testing
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            Chance is always in the room. This module covers how to decide
            whether an observed effect is real, or just noise: and
            how to pick the right test to make that call.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Sampling &amp; the CLT</li>
            <li>The 5 steps</li>
            <li>Type I &amp; II errors</li>
            <li>Choosing a test</li>
          </ul>
        </div>

        {/* Errors */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Two ways to be wrong
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Type I error (&alpha;)
              </p>
              <p className="mt-2 text-sm text-ink">
                False positive. Rejecting the null when it's actually
                true: concluding there's an effect when there
                isn't. Conventional threshold: &alpha; = 0.05 (5%).
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Type II error (&beta;)
              </p>
              <p className="mt-2 text-sm text-ink">
                False negative. Failing to reject the null when the
                alternative is true: missing a real effect.
                Conventional threshold: &beta; = 0.2 (20%).
              </p>
            </div>
          </div>
        </section>

        {/* Sample size, effect size, power */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Sample size, effect size, power
          </h2>
          <p className="mt-2 text-slate">
            Statistical power is the probability of correctly rejecting
            the null hypothesis when the alternative is true. The
            benchmark most studies target is 0.80 (80%): power = 1
            &minus; &beta;.
          </p>
          <div className="mt-6 space-y-3">
            <div className="rounded-lg border border-hairline p-4">
              <p className="text-sm text-ink">
                <strong>Sample size &amp; variability:</strong> larger
                samples reduce variability, which increases power.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="text-sm text-ink">
                <strong>Effect size &amp; power:</strong> larger effect
                sizes are easier to detect, which increases power.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="text-sm text-ink">
                <strong>&alpha; &amp; power:</strong> lowering &alpha;
                reduces Type I errors, but it also reduces power:
                there's a real tradeoff.
              </p>
            </div>
          </div>
        </section>

        {/* Sampling methods */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Sampling methods
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="w-40 px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Simple random
                  </td>
                  <td className="px-4 py-3">
                    Every individual has an equal chance of selection.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Systematic
                  </td>
                  <td className="px-4 py-3">
                    Selecting every n<sup>th</sup> individual.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Stratified
                  </td>
                  <td className="px-4 py-3">
                    Dividing the population into subgroups (strata) and
                    sampling from each, so specific groups of interest
                    are adequately represented.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Cluster
                  </td>
                  <td className="px-4 py-3">
                    Dividing the population into clusters and sampling
                    entire clusters.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg border border-hairline bg-ink/[0.02] p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              Real example: DC PRAMS
            </p>
            <p className="mt-2 text-sm text-ink">
              The DC Pregnancy Risk Assessment Monitoring System uses
              stratified sampling with three key features: (1){" "}
              <strong>stratification</strong>: live births are
              divided into strata by race/ethnicity, age, or geography;
              (2) <strong>oversampling</strong>: smaller or
              higher-priority subgroups get extra sampling to ensure
              enough data for analysis; (3){" "}
              <strong>random sampling within each stratum</strong>. This
              produces reliable, weighted estimates that generalize to
              the broader population of DC mothers and infants.
            </p>
          </div>
        </section>

        {/* CLT */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            The Central Limit Theorem
          </h2>
          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-5">
            <p className="text-sm text-ink">
              With a large enough sample size, the sampling distribution
              of the mean approaches a normal distribution:{" "}
              <strong>regardless of the shape of the underlying
              population's distribution</strong>. This is what makes most
              of classical hypothesis testing possible in the first
              place.
            </p>
          </div>
        </section>

        {/* 5 steps */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            The 5 steps of hypothesis testing
          </h2>
          <div className="mt-6 space-y-3">
            <div className="flex gap-4 rounded-lg border border-hairline p-4">
              <span className="font-mono text-sm text-teal">1</span>
              <p className="text-sm text-ink">
                State the hypotheses: the null (H&#8320;) assumes no
                effect or difference; the alternative (H&#8321;) assumes
                there is one.
              </p>
            </div>
            <div className="flex gap-4 rounded-lg border border-hairline p-4">
              <span className="font-mono text-sm text-teal">2</span>
              <p className="text-sm text-ink">
                Choose the significance level, &alpha;: typically
                0.05.
              </p>
            </div>
            <div className="flex gap-4 rounded-lg border border-hairline p-4">
              <span className="font-mono text-sm text-teal">3</span>
              <p className="text-sm text-ink">
                Calculate the test statistic (e.g., t-score, z-score,
                chi-square).
              </p>
            </div>
            <div className="flex gap-4 rounded-lg border border-hairline p-4">
              <span className="font-mono text-sm text-teal">4</span>
              <p className="text-sm text-ink">
                Compare the test statistic to the critical value, or
                calculate the p-value.
              </p>
            </div>
            <div className="flex gap-4 rounded-lg border border-hairline p-4">
              <span className="font-mono text-sm text-teal">5</span>
              <p className="text-sm text-ink">
                Decide: reject the null if the p-value is less than
                &alpha;.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate">
            A confidence interval is a range of values that likely
            contains the true population parameter. A 95% CI means: 95%
            of the time, we believe the true parameter lies within the
            interval.
          </p>
        </section>

        {/* Choosing a test */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Choosing a test
          </h2>
          <p className="mt-2 text-slate">
            The right test depends on your data type and whether your
            groups are independent or related.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Chi-square (&chi;&sup2;)
              </p>
              <p className="mt-2 text-sm text-ink">
                Tests association between categorical variables.
              </p>
              <p className="mt-2 text-sm text-slate">
                H&#8320;: no association between variables. H&#8321;:
                there is an association.
              </p>
              <p className="mt-2 text-sm text-slate">
                Example: smoking status (smoker/non-smoker) vs. disease
                presence (yes/no).
              </p>
              <p className="mt-2 font-mono text-xs text-amber">
                Assumptions: data must be categorical; expected frequency
                in each cell should generally be &ge; 5.
              </p>
            </div>

            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Independent t-test
              </p>
              <p className="mt-2 text-sm text-ink">
                Compares the means of two independent groups: no
                related data points across the groups.
              </p>
              <p className="mt-2 text-sm text-slate">
                H&#8320;: no difference between group means. H&#8321;: a
                significant difference exists.
              </p>
              <p className="mt-2 text-sm text-slate">
                Example: comparing average blood pressure between men and
                women in a study population.
              </p>
              <p className="mt-2 font-mono text-xs text-amber">
                Assumptions: data are continuous and normally
                distributed; the two groups are independent; variances
                are approximately equal (testable via Levene's test).
              </p>
            </div>

            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Paired t-test
              </p>
              <p className="mt-2 text-sm text-ink">
                Compares the means of two related groups: the same
                individuals measured twice.
              </p>
              <p className="mt-2 text-sm text-slate">
                H&#8320;: no difference between paired measurements.
                H&#8321;: a significant difference exists.
              </p>
              <p className="mt-2 text-sm text-slate">
                Example: weight before and after a diet intervention, in
                the same individuals.
              </p>
              <p className="mt-2 font-mono text-xs text-amber">
                Assumptions: data are continuous and normally
                distributed; observations are paired/dependent (the key
                difference from the independent t-test).
              </p>
            </div>

            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                ANOVA
              </p>
              <p className="mt-2 text-sm text-ink">
                Compares means across three or more groups at once.
                Not part of the official USMLE content guide, but
                practically important enough to know.
              </p>
            </div>
          </div>
        </section>

        {/* A priori vs post hoc */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            A priori vs. post hoc analysis
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                A priori
              </p>
              <p className="mt-2 text-sm text-ink">
                Predictions and analysis plans made before data
                collection begins.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Post hoc
              </p>
              <p className="mt-2 text-sm text-ink">
                Analysis decided after seeing the data: higher
                risk of finding spurious patterns, since you can go
                looking for whatever result appears.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/module-6"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Module 6
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
