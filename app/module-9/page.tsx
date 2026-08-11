"use client";

import Link from "next/link";

function KMChart() {
  const width = 600;
  const height = 320;
  const padL = 50;
  const padB = 40;
  const padT = 20;
  const padR = 20;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const months = [0, 6, 12, 18, 24];
  const regimenA = [100, 85, 70, 60, 55];
  const regimenB = [100, 70, 50, 35, 25];

  const xScale = (m: number) => padL + (m / 24) * plotW;
  const yScale = (p: number) => padT + (1 - p / 100) * plotH;

  function stepPath(values: number[]) {
    let d = `M${xScale(months[0])},${yScale(values[0])}`;
    for (let i = 1; i < values.length; i++) {
      d += ` L${xScale(months[i])},${yScale(values[i - 1])}`;
      d += ` L${xScale(months[i])},${yScale(values[i])}`;
    }
    return d;
  }

  // Level of the step function just before the next drop, for a given x.
  // Used to place illustrative censoring ticks on the flat portion of the curve.
  function levelAt(x: number, values: number[]) {
    for (let i = 1; i < months.length; i++) {
      if (x < months[i]) return values[i - 1];
    }
    return values[values.length - 1];
  }

  // Illustrative censoring times only \u2014 the source data reports survival
  // at 6-month checkpoints, not individual patient censoring times.
  const censorTimesA = [3, 9, 15, 21];
  const censorTimesB = [4, 10, 16];

  function renderTicks(times: number[], values: number[], color: string) {
    return times.map((t, i) => {
      const cx = xScale(t);
      const cy = yScale(levelAt(t, values));
      return (
        <line
          key={i}
          x1={cx}
          y1={cy - 6}
          x2={cx}
          y2={cy + 6}
          stroke={color}
          strokeWidth={1.5}
        />
      );
    });
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Kaplan-Meier survival curves for Regimen A and Regimen B, with illustrative censoring tick marks"
    >
      {/* Gridlines */}
      {[0, 25, 50, 75, 100].map((p) => (
        <line
          key={p}
          x1={padL}
          y1={yScale(p)}
          x2={width - padR}
          y2={yScale(p)}
          stroke="var(--color-hairline)"
          strokeWidth={1}
        />
      ))}

      {/* Axes */}
      <line
        x1={padL}
        y1={padT}
        x2={padL}
        y2={height - padB}
        stroke="var(--color-slate)"
        strokeWidth={1}
      />
      <line
        x1={padL}
        y1={height - padB}
        x2={width - padR}
        y2={height - padB}
        stroke="var(--color-slate)"
        strokeWidth={1}
      />

      {/* Y labels */}
      {[0, 25, 50, 75, 100].map((p) => (
        <text
          key={p}
          x={padL - 8}
          y={yScale(p) + 4}
          textAnchor="end"
          fontSize={10}
          fontFamily="var(--font-mono)"
          fill="var(--color-slate)"
        >
          {p}%
        </text>
      ))}

      {/* X labels */}
      {months.map((m) => (
        <text
          key={m}
          x={xScale(m)}
          y={height - padB + 16}
          textAnchor="middle"
          fontSize={10}
          fontFamily="var(--font-mono)"
          fill="var(--color-slate)"
        >
          {m}mo
        </text>
      ))}

      {/* 50% reference line */}
      <line
        x1={padL}
        y1={yScale(50)}
        x2={width - padR}
        y2={yScale(50)}
        stroke="var(--color-amber)"
        strokeWidth={1}
        strokeDasharray="4 4"
      />

      {/* Curves */}
      <path
        d={stepPath(regimenA)}
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth={2.5}
      />
      <path
        d={stepPath(regimenB)}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth={2.5}
      />

      {/* Illustrative censoring ticks */}
      {renderTicks(censorTimesA, regimenA, "var(--color-teal)")}
      {renderTicks(censorTimesB, regimenB, "var(--color-amber)")}

      {/* Legend */}
      <circle cx={width - 150} cy={padT + 8} r={4} fill="var(--color-teal)" />
      <text
        x={width - 140}
        y={padT + 12}
        fontSize={10}
        fontFamily="var(--font-mono)"
        fill="var(--color-ink)"
      >
        Regimen A
      </text>
      <circle cx={width - 150} cy={padT + 24} r={4} fill="var(--color-amber)" />
      <text
        x={width - 140}
        y={padT + 28}
        fontSize={10}
        fontFamily="var(--font-mono)"
        fill="var(--color-ink)"
      >
        Regimen B
      </text>
    </svg>
  );
}

export default function Module9() {
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
            Module 9
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Survival Analysis
          </h1>
          <p className="mt-4 max-w-xl text-slate">
            Some outcomes aren't just yes/no; they're about{" "}
            <em>when</em>. This extension module covers how to analyze
            time-to-event data, including the tricky part: people who
            leave a study before anything happens to them.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate">
            <li>Censoring</li>
            <li>Kaplan-Meier curves</li>
            <li>Hazard ratio</li>
          </ul>
        </div>

        {/* Time-to-event & censoring */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Time-to-event data &amp; censoring
          </h2>
          <p className="mt-2 text-slate">
            Survival analysis measures the time until a specific event
            occurs: death, relapse, myocardial infarction, hospital
            discharge, anything with a clear start and endpoint.
          </p>
          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-amber">
              The unique challenge: censoring
            </p>
            <p className="mt-2 text-sm text-ink">
              Censoring happens when we don't know a participant's exact
              event time. Three common reasons:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink">
              <li>The patient drops out (lost to follow-up)</li>
              <li>The study ends before the event happens</li>
              <li>
                The patient dies from an unrelated cause (a competing
                risk)
              </li>
            </ul>
            <p className="mt-3 text-sm text-slate">
              Critical assumption: censored patients are assumed to have
              the same future risk as patients who remain in the study
             : "non-informative censoring."
            </p>
          </div>
        </section>

        {/* Key terms */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Key terms</h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-hairline">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-hairline">
                <tr>
                  <td className="w-40 px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Censoring
                  </td>
                  <td className="px-4 py-3">
                    A subject's event time is unknown because follow-up
                    ended first (lost, withdrew, or study ended)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Log-rank test
                  </td>
                  <td className="px-4 py-3">
                    Compares two or more Kaplan-Meier curves for a
                    statistically significant difference
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-teal">
                    Hazard ratio
                  </td>
                  <td className="px-4 py-3">
                    The relative instantaneous risk of the event between
                    two groups, at any time point
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to read a KM curve */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            How to read a Kaplan-Meier curve
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Axes
              </p>
              <p className="mt-2 text-sm text-ink">
                X-axis: time. Y-axis: cumulative survival probability,
                0.0 to 1.0.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Vertical drops
              </p>
              <p className="mt-2 text-sm text-ink">
                Occur exactly when an event happens. Steeper drop = more
                events at that time.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Tick marks
              </p>
              <p className="mt-2 text-sm text-ink">
                Indicate a censored patient. Survival probability does
                not drop at a tick: shown as short vertical marks
                on the curves below.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-teal">
                Median survival
              </p>
              <p className="mt-2 text-sm text-ink">
                Read across from the 50% mark to the curve, then down to
                the x-axis. Often a better summary than the mean, which
                gets skewed by long-term survivors.
              </p>
            </div>
          </div>
        </section>

        {/* Worked example with real chart */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Worked example: reading a KM curve
          </h2>
          <p className="mt-2 text-slate">
            Two chemotherapy regimens are compared. The hazard ratio for
            death (Regimen A vs. B) is 0.65 (95% CI: 0.50&ndash;0.85).
          </p>

          <div className="mt-6 rounded-lg border border-hairline bg-ink/[0.02] p-6">
            <KMChart />
          </div>
          <p className="mt-2 font-mono text-xs text-slate">
            Tick marks show where censoring is read on the curve
            (illustrative placement: the source data reports
            survival at 6-month checkpoints, not individual patient
            censoring times).
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-slate">
                Median survival, A
              </p>
              <p className="mt-1 font-mono text-lg text-teal">&gt; 24 mo</p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-slate">
                Median survival, B
              </p>
              <p className="mt-1 font-mono text-lg text-amber">&asymp; 12 mo</p>
            </div>
            <div className="rounded-lg border border-hairline p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-slate">
                Hazard ratio
              </p>
              <p className="mt-1 font-mono text-lg text-ink">0.65</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate">
            HR = 0.65 means Regimen A patients have a 35% lower hazard of
            death at any time compared to Regimen B. The 95% CI
            (0.50&ndash;0.85) excludes 1.0, so this is statistically
            significant.
          </p>
        </section>

        {/* Hazard ratio deep dive */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Hazard ratio: survival analysis's Relative Risk
          </h2>
          <p className="mt-2 text-slate">
            The ratio of the hazard (instantaneous risk of the event) in
            one group compared to another, at any given point in time.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs text-teal">HR = 0.50</p>
              <p className="mt-2 text-sm text-ink">
                Treatment group has a 50% lower risk of the event at any
                time: highly protective.
              </p>
            </div>
            <div className="rounded-lg border border-hairline p-5">
              <p className="font-mono text-xs text-teal">HR = 2.0</p>
              <p className="mt-2 text-sm text-ink">
                Exposed group has twice the risk of the event at any time
               : dangerous.
              </p>
            </div>
          </div>
          <p className="mt-4 font-mono text-xs text-amber">
            Interpretation pearl: unlike RR, which is cumulative risk over
            the whole study period, HR summarizes risk instantaneously
            across follow-up. Always check that the proportional hazards
            assumption holds: the two curves shouldn't cross.
          </p>
          <p className="mt-3 text-sm text-slate">
            Comparing two KM curves for significance uses the{" "}
            <strong>log-rank test</strong>.
          </p>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-hairline pt-8">
          <Link
            href="/module-8"
            className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          >
            &larr; Module 8
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
