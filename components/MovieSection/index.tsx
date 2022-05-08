import { Movie } from "@/@types/tmdb";
import { MovieSectionContextProvider } from "@/contexts/MovieSectionContext";
import React from "react";
import { Pagination } from "./Pagination";
import { Slider } from "./Slider";
import { Title } from "./Title";

export interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

export const MovieSection: React.FC<MovieSectionProps> = props => (
  <MovieSectionContextProvider {...props}>
    <section className="flex flex-col gap-4">
      <div className="container flex w-full items-center justify-between">
        <Title />
        <Pagination />
      </div>

      <Slider />
    </section>
  </MovieSectionContextProvider>
);
