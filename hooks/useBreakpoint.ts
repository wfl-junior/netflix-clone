import { useCurrentBreakpoint } from "./useCurrentBreakpoint";
import { useIsBreakpoint } from "./useIsBreakpoint";

export const breakpoints = {
  base: 0,
  xs: 425,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(): ReturnType<typeof useCurrentBreakpoint>;

export function useBreakpoint(
  breakpoint: Breakpoint,
): ReturnType<typeof useIsBreakpoint>;

export function useBreakpoint(breakpoint?: Breakpoint) {
  if (breakpoint) {
    return useIsBreakpoint(breakpoint);
  }

  return useCurrentBreakpoint();
}
