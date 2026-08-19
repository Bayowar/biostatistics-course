"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function ScatterPlot({ r }: { r: number }) {
  const width = 600;
  const height = 300;
  const n = 60;

  // Generate random base points only after mount, client-side only,
  // to avoid a server/client hydration mismatch from Math.random().
  const [base, setBase] = useState<{ xs: number[]; zs: number[] } | null>(
    null
  );

  useEffect(() => {
    const xsArr: number[] = [];
    const zsArr: number[] = [];
    for (let i = 0; i < n; i++) {
      const u1 = Math.random();
      const u2 = Math.random();
      const g1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const u3 = Math.random();
      const u4 = Math.random();
      const g2 = Math.sqrt(-2 * Math.log(u3)) * Math.cos(2 * Math.PI * u4);
      xsArr.push(g1);
      zsArr.push(g2);
    }
    setBase({ xs: xsArr, zs: zsArr });
  }, []);

  if (!base) {
    return (
      <div
        style={{ height: 300 }}
        className="flex items-center justify-center font-mono text-xs text-slate"
      >
        Loading plot&hellip;
      </div>
    );
  }

  const { xs, zs } = base;

  const points = xs.map((x, i) => {
    const y = r * x + Math.sqrt(1 - r * r) * zs[i];
    const px = width / 2 + x * 60;
    const py = height / 2 - y * 60;
    return { px, py };
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label={`Scatterplot with correlation r = ${r}`}
    >
      <line
        x1={0}
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke="var(--color-hairline)"
        strokeWidth={1}
      />
      <line
        x1={width / 2}
        y1={0}
        x2={width / 2}
        y2={height}
        stroke="var(--color-hairline)"
        strokeWidth={1}
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.px}
          cy={p.py}
          r={4}
          fill="var(--color-teal)"
          fillOpacity={0.6}
        />
      ))}
    </svg>
  );
}

export default function Module8() {
  const [r, setR] = useState(0.6);

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
            Module 8
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Correlation &amp; Regression
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            Correlation tells you two things move together. Regression
            tells you how much: and lets you ask that question
            while holding everything else constant.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Correlation coefficient</li>
            <li>Multiple regression &amp; confounding</li>
            <li>Statistical vs. clinical significance</li>
          </ul>
        </div>

        {/* Correlation interactive */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            The correlation coefficient
          </h2>
          <p className="mt-2 text-slate">
            r ranges from &minus;1 to +1. Drag the slider and watch the
            point cloud tighten or scatter.
          </p>

          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <ScatterPlot r={r} />
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="r-slider"
                  className="font-mono text-xs uppercase tracking-wide text-slate"
                >
                  r
                </label>
                <span className="font-mono text-sm text-teal">
                  {r.toFixed(2)}
                </span>
              </div>
              <input
                id="r-slider"
                type="range"
                min={-1}
                max={1}
                step={0.05}
                value={r}
                onChange={(e) => setR(parseFloat(e.target.value))}
                className="mt-2 w-full accent-teal"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs text-teal">r = 0</p>
              <p className="mt-1 text-sm text-ink">No relationship</p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs text-teal">r = &minus;1</p>
              <p className="mt-1 text-sm text-ink">
                Perfect negative relationship
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs text-teal">r = +1</p>
              <p className="mt-1 text-sm text-ink">
                Perfect positive relationship
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate">
            Significance of r is tested with df = n &minus; 2, using a
            t-distribution.
          </p>
          <p className="mt-2 font-mono text-xs text-amber">
            Correlation &ne; causation.
          </p>
        </section>

        {/* Regression types */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Two kinds of regression
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Linear regression
              </p>
              <p className="mt-2 text-sm text-ink">
                &beta; = change in a continuous outcome per one-unit
                change in the predictor.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Logistic regression
              </p>
              <p className="mt-2 text-sm text-ink">
                &beta; = change in log-odds. Exponentiate (e<sup>&beta;</sup>)
                to get an adjusted odds ratio.
              </p>
            </div>
          </div>
        </section>

        {/* Confounding */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Confounding
          </h2>
          <p className="mt-2 text-slate">
            A confounder is a third variable associated with{" "}
            <strong>both</strong> the exposure and the outcome, but not
            on the causal pathway between them. Left unadjusted, it
            distorts the apparent exposure&ndash;outcome relationship
            &mdash; multiple regression&rsquo;s main job is removing
            that distortion.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Criteria for a confounder
              </p>
              <p className="mt-2 text-sm text-ink">
                Associated with the exposure, associated with the
                outcome independent of the exposure, and not a step in
                the causal chain between them (i.e. not a mediator).
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Confounder vs. effect modifier
              </p>
              <p className="mt-2 text-sm text-ink">
                A confounder distorts the estimate &mdash; adjust it
                away. An effect modifier means the exposure genuinely
                behaves differently across subgroups &mdash; don&rsquo;t
                adjust it away, report it (e.g. stratified estimates).
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-hairline bg-ink/[0.02] p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              Classic example
            </p>
            <p className="mt-2 text-sm text-slate">
              Coffee drinking looks associated with lung cancer in
              unadjusted data &mdash; but smoking is associated with
              both coffee drinking and lung cancer, and isn&rsquo;t on
              the causal path from coffee to cancer. Once you adjust
              for smoking, most or all of the coffee&ndash;cancer
              association disappears. That adjustment is exactly what
              a multiple regression coefficient does automatically: the
              sodium coefficient below is already &ldquo;adjusted
              for&rdquo; age and BMI as potential confounders.
            </p>
          </div>
        </section>

        {/* Worked example 1: reading a multiple regression model */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Worked example: reading a regression model
          </h2>
          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              Clinical vignette
            </p>
            <p className="mt-3 text-sm text-ink">
              A multiple linear regression model examines systolic blood
              pressure (SBP) as a function of daily sodium intake,
              adjusting for age and BMI:
            </p>
            <p className="mt-3 font-mono text-sm text-ink">
              SBP = 110 + 2.5&times;(Sodium, g) + 0.8&times;(Age, yr) +
              1.1&times;(BMI, kg/m&sup2;)
            </p>
            <p className="mt-4 text-sm text-ink">
              How do you interpret the sodium coefficient (2.5)?
            </p>
            <p className="mt-2 text-sm text-slate">
              For every 1 g increase in daily sodium intake, SBP increases
              by 2.5 mmHg: holding age and BMI constant. That's the
              key difference from a simple correlation coefficient: a
              multiple regression coefficient is an{" "}
              <strong>adjusted effect</strong>, isolating sodium's
              association with SBP independent of the other covariates
              in the model.
            </p>
          </div>
        </section>

        {/* Worked example 2: statistical vs clinical significance */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Worked example: statistical vs. clinical significance
          </h2>
          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              Clinical vignette
            </p>
            <p className="mt-3 text-sm text-ink">
              A trial of 50,000 patients finds that a new antihypertensive
              lowers systolic blood pressure by 1.2 mmHg more than
              placebo (95% CI: 0.8&ndash;1.6 mmHg; p &lt; 0.001).
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  P-value
                </p>
                <p className="mt-1 font-mono text-lg text-teal">&lt; 0.001</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  95% CI
                </p>
                <p className="mt-1 font-mono text-lg text-teal">
                  0.8&ndash;1.6 mmHg
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-slate">
                  Mean effect
                </p>
                <p className="mt-1 font-mono text-lg text-teal">1.2 mmHg</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink">
              Is this finding clinically meaningful?
            </p>
            <p className="mt-2 text-sm text-slate">
              Statistically significant: the huge sample size
              (n=50,000) gives enormous power to detect even a tiny
              difference, and the CI excludes zero. But 1.2 mmHg is far
              below the threshold generally considered clinically
              meaningful for blood pressure management. Always report and
              interpret effect size, not just the p-value.
            </p>
          </div>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/module-7"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Module 7
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
