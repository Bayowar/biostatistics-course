"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Presentation Mode
 *
 * Turns a module page into full-screen, one-idea-at-a-time slides for
 * live lecturing, without touching any module's content. It works by
 * finding the page's existing structural pieces (the intro header block
 * and each <section>) and showing exactly one at a time, hiding the
 * rest via inline display:none. Because the underlying React elements
 * are hidden rather than unmounted, every interactive widget (sliders,
 * calculators, the coin-flip demo, etc.) keeps working exactly as
 * before once you land back on its slide.
 *
 * Controls: Right arrow / Space / click = next. Left arrow = previous.
 * Escape = exit. On-screen buttons mirror all three.
 */
export default function PresentationMode() {
  const pathname = usePathname();
  const isModulePage = /^\/module-\d+\/?$/.test(pathname ?? "");

  const [presenting, setPresenting] = useState(false);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  const slidesRef = useRef<HTMLElement[]>([]);
  const chromeRef = useRef<HTMLElement[]>([]);

  // Reset whenever the page changes.
  useEffect(() => {
    setPresenting(false);
    setIndex(0);
  }, [pathname]);

  const collectSlides = useCallback(() => {
    const container = document.querySelector<HTMLElement>(
      "main > div.mx-auto"
    );
    if (!container) return { slides: [], chrome: [] };

    const children = Array.from(container.children) as HTMLElement[];
    const divs = children.filter((el) => el.tagName === "DIV");
    const sections = children.filter((el) => el.tagName === "SECTION");
    const links = children.filter((el) => el.tagName === "A");

    const header = divs[0] ?? null;
    const footer = divs.length > 1 ? divs[divs.length - 1] : null;

    const slides = [header, ...sections].filter(
      (el): el is HTMLElement => el !== null
    );
    const chrome = [...links, ...(footer ? [footer] : [])];

    return { slides, chrome };
  }, []);

  const showOnly = useCallback((i: number) => {
    slidesRef.current.forEach((el, n) => {
      el.style.display = n === i ? "" : "none";
    });
  }, []);

  const enter = useCallback(() => {
    const { slides, chrome } = collectSlides();
    if (slides.length === 0) return;
    slidesRef.current = slides;
    chromeRef.current = chrome;
    chrome.forEach((el) => {
      el.style.display = "none";
    });
    document.body.classList.add("presenting");
    setCount(slides.length);
    setIndex(0);
    showOnly(0);
    setPresenting(true);
  }, [collectSlides, showOnly]);

  const exit = useCallback(() => {
    slidesRef.current.forEach((el) => {
      el.style.display = "";
    });
    chromeRef.current.forEach((el) => {
      el.style.display = "";
    });
    document.body.classList.remove("presenting");
    setPresenting(false);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => {
      const n = Math.min(i + 1, slidesRef.current.length - 1);
      showOnly(n);
      return n;
    });
  }, [showOnly]);

  const prev = useCallback(() => {
    setIndex((i) => {
      const n = Math.max(i - 1, 0);
      showOnly(n);
      return n;
    });
  }, [showOnly]);

  useEffect(() => {
    if (!presenting) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        exit();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [presenting, next, prev, exit]);

  // Clean up if the component unmounts mid-presentation (e.g. navigation).
  useEffect(() => {
    return () => {
      document.body.classList.remove("presenting");
    };
  }, []);

  if (!isModulePage) return null;

  if (!presenting) {
    return (
      <button
        onClick={enter}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-hairline bg-paper px-5 py-3 font-mono text-xs uppercase tracking-wide text-ink shadow-lg hover:border-teal hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        aria-label="Enter presentation mode"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        Present
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-hairline bg-paper/95 px-6 py-4 backdrop-blur">
      <button
        onClick={exit}
        className="font-mono text-xs uppercase tracking-wide text-slate hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        aria-label="Exit presentation mode"
      >
        Esc &middot; Exit
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className="rounded-full border border-hairline p-2 text-ink hover:border-teal hover:text-teal disabled:opacity-30 disabled:hover:border-hairline disabled:hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          aria-label="Previous slide"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="min-w-[3.5rem] text-center font-mono text-xs text-slate">
          {index + 1} / {count}
        </span>
        <button
          onClick={next}
          disabled={index === count - 1}
          className="rounded-full border border-hairline p-2 text-ink hover:border-teal hover:text-teal disabled:opacity-30 disabled:hover:border-teal disabled:hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          aria-label="Next slide"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <span className="font-mono text-xs uppercase tracking-wide text-slate">
        &larr; &rarr; or Space
      </span>
    </div>
  );
}
