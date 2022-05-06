import { Movie } from "@/@types/tmdb";
import { getBackdropImagePrefix } from "@/utils/getBackdropImagePrefix";
import React from "react";

interface MovieBatchProps {
  movies: Movie[];
}

export const MovieBatch: React.FC<MovieBatchProps> = ({ movies }) => {
  return (
    <div className="contents">
      {movies.map(movie => (
        <img
          data-title={movie.title}
          key={movie.id}
          src={getBackdropImagePrefix("w500") + movie.backdrop_path}
          alt={`Backdrop image for the movie ${movie.title}`}
          className="aspect-video w-1/2 cursor-pointer snap-start scroll-ml-[3vw] rounded object-cover sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
        />
      ))}
    </div>
  );
};
