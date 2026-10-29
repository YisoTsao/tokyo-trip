import { useEffect, type RefObject } from "react";

// Blocks that fade up as they scroll into view. Rows inside long cards (timeline stops,
// booking legs, expense rows) animate on their own, but never inside a block that is
// already animating, so nothing moves twice.
const REVEAL = [
  ".j-heading",
  ".j-card",
  ".j-daycard",
  ".j-filters",
  ".j-pager",
  ".j-exp-foot",
  ".j-tl__item",
  ".j-leg",
  ".j-pack__group",
  ".j-exp__table tbody tr",
].join(",");

const prefersMotion = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  } catch {
    return false;
  }
};

/**
 * Sticky-nav state (shadow once scrolled, reading progress bar), a gentle drift on the
 * header illustrations, and fade-up reveals for blocks below the fold.
 * Everything is skipped when the visitor asks for reduced motion.
 */
export function useScrollMotion(navRef: RefObject<HTMLElement | null>, mainRef: RefObject<HTMLElement | null>, routeKey: string) {
  // Nav height feeds sticky offsets elsewhere (the day page aside).
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty("--nav-h", `${nav.offsetHeight}px`));
    ro.observe(nav);
    return () => ro.disconnect();
  }, [navRef]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const motion = prefersMotion();
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      nav.toggleAttribute("data-scrolled", y > 8);
      nav.style.setProperty("--progress", max > 0 ? String(Math.min(1, y / max)) : "0");
      if (motion) document.documentElement.style.setProperty("--scroll-y", String(Math.min(y, 900)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [navRef, routeKey]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main || !prefersMotion() || typeof IntersectionObserver === "undefined") return;
    const all = Array.from(main.querySelectorAll<HTMLElement>(REVEAL));
    // Only hide what starts below the fold, so nothing on screen ever blinks.
    const ROWS = ".j-tl__item,.j-leg,.j-pack__group,.j-exp__table tbody tr";
    const below = all.filter((el) => {
      const r = el.getBoundingClientRect();
      // A card taller than the screen fading as one slab looks heavy: let its rows reveal instead.
      if (r.height > window.innerHeight && el.querySelector(ROWS)) return false;
      return r.top > window.innerHeight * 0.92;
    });
    const picked = new Set<Element>();
    for (const el of below) {
      let a = el.parentElement;
      while (a && a !== main && !picked.has(a)) a = a.parentElement;
      if (!a || a === main) picked.add(el);
    }
    const targets = below.filter((el) => picked.has(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => targets.includes(c as HTMLElement)) : [];
      el.style.setProperty("--reveal-delay", `${(siblings.indexOf(el) % 4) * 70}ms`);
      el.classList.add("j-reveal");
      io.observe(el);
    });
    return () => {
      io.disconnect();
      targets.forEach((el) => {
        el.classList.remove("j-reveal", "is-in");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [mainRef, routeKey]);
}
