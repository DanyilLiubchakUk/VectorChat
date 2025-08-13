import { useEffect, useState } from "react";

type MediaQueryListLegacy = MediaQueryList & {
  addListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
};

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
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

  return mounted ? isDesktop : false;
}
