"use client";

import Link from "next/link";
import { useState } from "react";

function NormalCurve({ mean, sd }: { mean: number; sd: number }) {
  const width = 600;
  const height = 220;
  const xMin = -6;
  const xMax = 6;
  const points: string[] = [];

  for (let i = 0; i <= 120; i++) {
    const x = xMin + ((xMax - xMin) * i) / 120;
    const y =
      (1 / (sd * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
    const px = ((x - xMin) / (xMax - xMin)) * width;
    const py = height - y * sd * 340 - 12;
    points.push(`${px.toFixed(1)},${Math.max(8, py).toFixed(1)}`);
  }

  const pathD = `M0,${height} L${points.join(" L")} L${width},${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label={`Normal distribution curve with mean ${mean} and standard deviation ${sd}`}
    >
      <line
        x1={0}
        y1={height}
        x2={width}
        y2={height}
        stroke="var(--color-hairline)"
        strokeWidth={1}
      />
      <path d={pathD} fill="var(--color-teal)" fillOpacity={0.15} stroke="var(--color-teal)" strokeWidth={2} />
    </svg>
  );
}

export default function Module2() {
  const [mean, setMean] = useState(0);
  const [sd, setSd] = useState(1);

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
            Module 2
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Distributions
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            How data spreads out matters as much as what it centers on. This
            module covers how to summarize a dataset&rsquo;s middle, its
            spread, and its shape.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Central tendency</li>
            <li>Variability</li>
            <li>The normal curve</li>
            <li>Z-scores</li>
          </ul>
        </div>

        {/* Central tendency */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Central tendency
          </h2>
          <p className="mt-2 text-slate">
            Three ways to describe the &ldquo;middle&rdquo; of a dataset:
            each answering a slightly different question.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Mean
              </p>
              <p className="mt-2 text-sm text-ink">
                The arithmetic average. Sensitive to outliers.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Median
              </p>
              <p className="mt-2 text-sm text-ink">
                The middle value when data is ordered. Resistant to outliers
               : the better choice for skewed data.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Mode
              </p>
              <p className="mt-2 text-sm text-ink">
                The most frequently occurring value. Only measure that
                applies to nominal data.
              </p>
            </div>
          </div>
        </section>

        {/* Variability */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Variability</h2>
          <p className="mt-2 text-slate">
            Two datasets can share the same mean and look nothing alike.
            Variability measures how spread out the values are.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="w-40 px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Range
                  </td>
                  <td className="px-4 py-3">
                    Maximum value minus minimum value.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Variance
                  </td>
                  <td className="px-4 py-3">
                    Average of squared deviations from the mean.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Standard deviation
                  </td>
                  <td className="px-4 py-3">
                    Square root of variance: back in the original
                    units, so it&rsquo;s the one people actually report.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive normal curve */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            The normal curve
          </h2>
          <p className="mt-2 text-slate">
            Symmetric, bell-shaped, defined completely by its mean and
            standard deviation. Adjust both and watch the curve respond.
          </p>

          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <NormalCurve mean={mean} sd={sd} />

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="mean-slider"
                    className="font-mono text-xs uppercase tracking-wide text-slate"
                  >
                    Mean
                  </label>
                  <span className="font-mono text-sm text-teal">{mean}</span>
                </div>
                <input
                  id="mean-slider"
                  type="range"
                  min={-3}
                  max={3}
                  step={0.5}
                  value={mean}
                  onChange={(e) => setMean(parseFloat(e.target.value))}
                  className="mt-2 w-full accent-teal"
                />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="sd-slider"
                    className="font-mono text-xs uppercase tracking-wide text-slate"
                  >
                    Standard deviation
                  </label>
                  <span className="font-mono text-sm text-teal">{sd}</span>
                </div>
                <input
                  id="sd-slider"
                  type="range"
                  min={0.5}
                  max={3}
                  step={0.25}
                  value={sd}
                  onChange={(e) => setSd(parseFloat(e.target.value))}
                  className="mt-2 w-full accent-teal"
                />
              </div>
            </div>
          </div>

          <p className="mt-4 font-mono text-xs text-amber">
            68 / 95 / 99.7 rule: about 68% of values fall within 1 SD
            of the mean, 95% within 2 SD, and 99.7% within 3 SD.
          </p>
        </section>

        {/* Z-scores */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Z-scores</h2>
          <p className="mt-2 text-slate">
            A z-score converts any value into &ldquo;how many standard
            deviations from the mean.&rdquo; It's what lets you compare
            values from completely different scales.
          </p>
          <div className="mt-6 rounded-lg border border-hairline p-5">
            <p className="font-mono text-sm text-ink">
              z = (x &minus; mean) &divide; SD
            </p>
            <p className="mt-3 text-sm text-slate">
              A positive z-score means the value sits above the mean; a
              negative z-score means it sits below. The larger the absolute
              value, the more unusual that data point is relative to the
              rest of the distribution.
            </p>
          </div>
        </section>

        {/* Transformations & RTM */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Transformations & regression to the mean
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Data transformations
              </p>
              <p className="mt-2 text-sm text-ink">
                Log, square root, or reciprocal transforms can convert
                skewed data into something closer to normal, making it
                usable with tests that assume normality.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Regression to the mean
              </p>
              <p className="mt-2 text-sm text-ink">
                Extreme measurements tend to be followed by measurements
                closer to average: not because of any intervention,
                but because extremes are partly due to chance.
              </p>
            </div>
          </div>
        </section>

        {/* Worked example */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Worked example
          </h2>
          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              Clinical case
            </p>
            <p className="mt-3 text-sm text-ink">
              A birthweight study reports a mean of 3,400g with a standard
              deviation of 450g, and a distribution that is roughly normal.
              An infant is born weighing 2,500g.
            </p>
            <p className="mt-3 text-sm text-slate">
              That birthweight is about 2 SD below the mean (z &asymp;
              &minus;2): placing it near the low end of the
              distribution, consistent with the clinical threshold often
              used to flag low birthweight.
            </p>
          </div>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/module-1"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Module 1
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
