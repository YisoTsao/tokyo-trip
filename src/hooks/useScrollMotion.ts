import { useEffect, type RefObject } from "react";

const prefersMotion = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  } catch {
    return false;
  }
};

/**
 * Sticky-nav state (shadow once scrolled, reading progress bar) and a gentle drift on the
 * header illustrations. Blocks no longer fade up on scroll: text stays put when switching pages.
 * The drift is skipped when the visitor asks for reduced motion.
 */
export function useScrollMotion(navRef: RefObject<HTMLElement | null>, routeKey: string) {
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
}
