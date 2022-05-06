export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  poster_path: string | null;
  adult: boolean;
  overviw: string;
  release_date: string;
  genre_ids: Array<Genre["id"]>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface Paginated<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}
