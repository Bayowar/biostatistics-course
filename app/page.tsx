import Link from "next/link";

const MODULES = [
  {
    number: "01",
    slug: "/module-1",
    title: "Introduction",
    description:
      "Statistics vs. biostatistics, qualitative vs. quantitative data, and the levels of measurement hierarchy.",
    status: "available",
  },
  {
    number: "02",
    slug: "/module-2",
    title: "Distributions",
    description:
      "Central tendency, variability, the normal curve, z-scores, and regression to the mean.",
    status: "available",
  },
  {
    number: "03",
    slug: "/module-3",
    title: "Probability",
    description:
      "Conditional probability, decision trees, and the addition and product rules.",
    status: "available",
  },
  {
    number: "04",
    slug: "/module-4",
    title: "Disease Frequency",
    description: "Incidence, prevalence, and their role in public health policy.",
    status: "available",
  },
  {
    number: "05",
    slug: "/module-5",
    title: "Measures of Association",
    description: "Relative risk, odds ratio, ARR, NNT, and NNH.",
    status: "available",
  },
  {
    number: "06",
    slug: "/module-6",
    title: "Testing & Screening",
    description:
      "Sensitivity, specificity, likelihood ratios, Bayes' theorem, and ROC curves.",
    status: "available",
  },
  {
    number: "07",
    slug: "/module-7",
    title: "Hypothesis Testing",
    description:
      "Sampling methods, the Central Limit Theorem, Type I/II errors, and choosing the right test.",
    status: "available",
  },
  {
    number: "08",
    slug: "/module-8",
    title: "Correlation & Regression",
    description:
      "Reading correlation coefficients and regression models, statistical vs. clinical significance.",
    status: "available",
  },
  {
    number: "09",
    slug: "/module-9",
    title: "Survival Analysis",
    description: "Time-to-event data, Kaplan-Meier curves, and hazard ratios.",
    status: "available",
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        {/* Hero */}
        <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl">
          Population Health and Biostatistics
        </h1>
        <p className="mt-3 font-mono text-sm uppercase tracking-wide text-slate">
          Bayowa Onabajo, MS, MBChB
        </p>
        <Link
          href="/module-1"
          className="mt-8 inline-block rounded-md bg-teal px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        >
          Start Learning &rarr;
        </Link>

        {/* Module index */}
        <div className="mt-16 border-t border-hairline">
          {MODULES.map((mod) => {
            const isAvailable = mod.status === "available";
            const row = (
              <div className="flex items-start justify-between gap-6 border-b border-hairline py-5">
                <div className="flex gap-5">
                  <span
                    className={`font-mono text-sm ${
                      isAvailable ? "text-teal" : "text-slate"
                    }`}
                  >
                    {mod.number}
                  </span>
                  <div>
                    <h2
                      className={`font-display text-lg font-semibold ${
                        isAvailable ? "text-ink" : "text-slate"
                      }`}
                    >
                      {mod.title}
                    </h2>
                    <p className="mt-1 max-w-md text-sm text-slate">
                      {mod.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 font-mono text-xs uppercase tracking-wide ${
                    isAvailable ? "text-teal" : "text-slate/70"
                  }`}
                >
                  {isAvailable ? "Start \u2192" : "Coming soon"}
                </span>
              </div>
            );

            return (
              <Link
                key={mod.number}
                href={mod.slug}
                className="block transition-colors hover:bg-ink/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
              >
                {row}
              </Link>
            );
          })}
        </div>

        <p className="mt-8 font-mono text-xs text-slate">
          9 modules &middot; Final Review &middot; Resources
        </p>
      </div>
    </main>
  );
}
