export function getBackdropImagePrefix(
  size: "original" | "w300" | "w400" | "w500" | "w780" | "w1280",
): string {
  return `https://image.tmdb.org/t/p/${size}`;
}
