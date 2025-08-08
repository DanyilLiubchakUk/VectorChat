import { useEffect, useState } from "react";

type MediaQueryListLegacy = MediaQueryList & {
  addListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
};

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 640px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq: MediaQueryListLegacy = window.matchMedia("(min-width: 640px)");

    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    // initialize
    setIsDesktop(mq.matches);

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(onChange);
    }

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", onChange);
      } else if (typeof mq.removeListener === "function") {
        mq.removeListener(onChange);
      }
    };
  }, []);

  return isDesktop;
}
