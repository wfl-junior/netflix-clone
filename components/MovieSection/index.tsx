import { Tuple } from "@/@types/app";
import { Movie } from "@/@types/tmdb";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { batchMovies } from "@/utils/batchMovies";
import classNames from "classnames";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MovieBatch } from "./MovieBatch";
import { SliderButton } from "./SliderButton";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

const containerPadding = 0.03;
const translateXProperty = "--tw-translate-x";
const sliderTransitionClassNames = ["transition-transform", "duration-500"];

export const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
}) => {
  const isFirstScroll = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hovering, setHovering] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { width } = useWindowDimensions();
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sliderRef.current?.style.setProperty(translateXProperty, "0");
  }, [currentPage, sliderRef.current]);

  const swapPage = useCallback(
    (type: "previous" | "next") => {
      if (animating) return;

      setAnimating(true);

      const nextPage =
        type === "previous"
          ? currentPage === 1
            ? totalPages
            : currentPage - 1
          : currentPage === totalPages
          ? 1
          : currentPage + 1;

      if (sliderRef.current) {
        sliderRef.current.classList.add(...sliderTransitionClassNames);

        sliderRef.current.style.setProperty(
          translateXProperty,
          `${
            (sliderRef.current.offsetWidth -
              window.innerWidth * containerPadding) *
            (type === "previous" ? 1 : -1)
          }px`,
        );

        const eventToListenTo: keyof HTMLElementEventMap = "transitionend";

        const handleTransitionEnd = function (this: typeof sliderRef.current) {
          this.classList.remove(...sliderTransitionClassNames);
          setCurrentPage(nextPage);
          this.removeEventListener(eventToListenTo, handleTransitionEnd);
        };

        sliderRef.current.addEventListener(
          eventToListenTo,
          handleTransitionEnd,
        );
      }

      if (isFirstScroll.current) {
        isFirstScroll.current = false;
      }
    },
    [animating, sliderRef.current],
  );

  let perPage = 2;

  switch (true) {
    case width >= 1280: {
      perPage = 6;
      break;
    }
    case width >= 1024: {
      perPage = 5;
      break;
    }
    case width >= 768: {
      perPage = 4;
      break;
    }
    case width >= 640: {
      perPage = 3;
      break;
    }
    default: {
      perPage = 2;
      break;
    }
  }

  const totalPages = Math.floor(movies.length / perPage);
  const movieBatches = batchMovies(movies, perPage);

  const getPreviousPage = useCallback(
    (page: number) => (page === 1 ? totalPages : page - 1),
    [totalPages],
  );

  const getNextPage = useCallback(
    (page: number) => (page === totalPages ? 1 : page + 1),
    [totalPages],
  );

  const previousPage = getPreviousPage(currentPage);
  const nextPage = getNextPage(currentPage);

  const getMovieBatchForPage = useCallback(
    (page: number) => movieBatches[page - 1],
    [movieBatches],
  );

  const currentBatch = getMovieBatchForPage(currentPage);

  const previousBatches: Tuple<Movie[]> = [
    getMovieBatchForPage(previousPage === 1 ? totalPages : previousPage - 1),
    getMovieBatchForPage(previousPage),
  ];

  const nextBatches: Tuple<Movie[]> = [
    getMovieBatchForPage(nextPage),
    getMovieBatchForPage(nextPage === totalPages ? 1 : nextPage + 1),
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="group container flex items-center justify-between">
        <h2 className="cursor-pointer text-xs font-bold text-movie-section-title transition-colors hover:text-white sm:text-sm md:text-base lg:text-[1.4vw]">
          {title}
        </h2>

        <ol className={hovering ? "flex items-center gap-0.5" : "hidden"}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li
              key={page}
              className={classNames(
                "h-0.5 w-3",
                currentPage === page
                  ? "bg-movie-section-pagination-indicator-active"
                  : "bg-movie-section-pagination-indicator",
              )}
            >
              <span className="sr-only">Indicator for page: {page}</span>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {hovering && (
          <Fragment>
            {!isFirstScroll.current && (
              <SliderButton type="previous" swapPage={swapPage} />
            )}

            <SliderButton type="next" swapPage={swapPage} />
          </Fragment>
        )}

        <div className="no-scrollbar snap-x snap-proximity overflow-x-auto">
          <div
            ref={sliderRef}
            className="container flex transform touch-pan-y items-center gap-[0.5vw]"
            style={{ width: `calc(100% - 0.5vw * ${perPage})` }}
            onTransitionEnd={() => setAnimating(false)}
          >
            {!isFirstScroll.current &&
              previousBatches.map(movies => (
                <MovieBatch key={movies[0].id} movies={movies} />
              ))}

            <MovieBatch movies={currentBatch} />

            {nextBatches.map(movies => (
              <MovieBatch key={movies[0].id} movies={movies} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
