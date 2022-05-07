import { Movie } from "@/@types/tmdb";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useForceUpdate } from "@/hooks/useForceUpdate";
import { getBackdropImagePrefix } from "@/utils/getBackdropImagePrefix";
import { match } from "@/utils/match";
import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type SwiperType from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderButton } from "./SliderButton";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
}) => {
  const isFirstScroll = useRef(true);
  const [hovering, setHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement & { swiper: SwiperType }>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    const handleFocusIn = () => setHovering(true);
    const handleFocusOut = () => setHovering(false);

    containerRef.current?.addEventListener("focusin", handleFocusIn);
    containerRef.current?.addEventListener("focusout", handleFocusOut);

    return () => {
      containerRef.current?.removeEventListener("focusin", handleFocusIn);
      containerRef.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const perPage = useMemo(
    () =>
      match(
        breakpoint,
        {
          sm: 3,
          md: 4,
          lg: 5,
          xl: 6,
          "2xl": 6,
        },
        2,
      ),
    [breakpoint],
  );

  const totalPages = useMemo(
    () => Math.floor(movies.length / perPage),
    [movies.length, perPage],
  );

  const swapPage = useCallback(
    (type: "previous" | "next") => {
      if (sliderRef.current) {
        const { swiper } = sliderRef.current;

        if (type === "previous") {
          swiper.slidePrev();
        } else {
          swiper.slideNext();
        }
      }

      if (isFirstScroll.current) {
        isFirstScroll.current = false;
      }
    },
    [totalPages],
  );

  return (
    <section className="flex flex-col gap-4">
      <div className="container flex w-full items-center justify-between">
        <h2 className="cursor-pointer text-xs font-bold text-movie-section-title transition-colors hover:text-white sm:text-sm md:text-base lg:text-[1.4vw]">
          {title}
        </h2>

        <ol className={hovering ? "flex items-center gap-0.5" : "hidden"}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li
              key={page}
              className={classNames(
                "h-0.5 w-3",
                Math.floor(
                  (sliderRef.current?.swiper.realIndex || 0) / perPage + 1,
                ) === page
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
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {isFirstScroll.current ? (
          <div
            className="absolute left-0 z-10 h-full w-[var(--container-padding)] bg-background"
            aria-hidden="true"
          ></div>
        ) : (
          <SliderButton
            type="previous"
            swapPage={swapPage}
            hovering={hovering}
          />
        )}

        <SliderButton type="next" swapPage={swapPage} hovering={hovering} />

        <Swiper
          // @ts-ignore
          ref={sliderRef}
          loop
          spaceBetween={5}
          slidesPerView={perPage}
          slidesPerGroup={perPage}
          speed={750}
          onSlideChange={forceUpdate}
          className="!container"
          breakpoints={{ 1536: { spaceBetween: 7 } }}
        >
          {movies
            .slice(0, movies.length - (movies.length % totalPages))
            .map(movie => (
              <SwiperSlide key={movie.id}>
                <img
                  data-title={movie.title}
                  src={getBackdropImagePrefix("w500") + movie.backdrop_path}
                  alt={`Backdrop image for the movie ${movie.title}`}
                  className="aspect-video max-w-full cursor-pointer rounded object-cover"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
