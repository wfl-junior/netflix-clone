import { Movie } from "@/@types/tmdb";

export function batchMovies(movies: Movie[], perPage: number) {
  const copy = [...movies];
  const movieBatches: Array<typeof movies> = [];

  while (copy.length) {
    if (copy.length < perPage) {
      break;
    }

    movieBatches.push(copy.splice(0, perPage));
  }

  return movieBatches;
}
