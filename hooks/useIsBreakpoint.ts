import { useCallback, useEffect, useState } from "react";
import { Breakpoint, breakpoints } from "./useBreakpoint";

export function useIsBreakpoint(breakpoint: Breakpoint) {
  const [targetReached, setTargetReached] = useState(false);

  const handleChange = useCallback(
    (e: MediaQueryListEvent) => setTargetReached(e.matches),
    [],
  );

  useEffect(() => {
    const width = breakpoints[breakpoint];
    const media = window.matchMedia(`(min-width: ${width}px)`);
    media.addEventListener("change", handleChange);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", handleChange);
  }, []);

  return targetReached;
}
