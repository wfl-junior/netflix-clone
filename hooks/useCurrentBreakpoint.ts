import { useCallback, useEffect, useState } from "react";
import { Breakpoint, breakpoints } from "./useBreakpoint";

export function useCurrentBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("base");

  const getCurrentBreakpoint = useCallback((): Breakpoint => {
    const breakpointsArray = Object.entries(breakpoints).reverse();

    for (let i = 0; i < breakpointsArray.length; i++) {
      const [breakpoint, width] = breakpointsArray[i];
      const media = window.matchMedia(`(min-width: ${width}px)`);

      if (media.matches) {
        return breakpoint as Breakpoint;
      }
    }

    return "base";
  }, []);

  const handleChange = useCallback(() => {
    const breakpoint = getCurrentBreakpoint();
    setBreakpoint(breakpoint);
  }, []);

  useEffect(() => {
    handleChange();

    window.addEventListener("resize", handleChange);
    window.addEventListener("orientationchange", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
      window.removeEventListener("orientationchange", handleChange);
    };
  }, []);

  return breakpoint;
}
