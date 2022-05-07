import { Movie } from "@/@types/tmdb";
import { useForceUpdate } from "@/hooks/useForceUpdate";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { getBackdropImagePrefix } from "@/utils/getBackdropImagePrefix";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SwiperType, { Navigation } from "swiper";
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
  const { width } = useWindowDimensions();
  const sliderRef = useRef<HTMLDivElement & { swiper: SwiperType }>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

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

  const swapPage = useCallback(
    (type: "previous" | "next") => {
      if (sliderRef.current) {
        if (type === "previous") {
          sliderRef.current.swiper.slidePrev();
        } else {
          sliderRef.current.swiper.slideNext();
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
        {!isFirstScroll.current && (
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
          modules={[Navigation]}
          slidesPerView={perPage}
          slidesPerGroup={perPage}
          speed={750}
          breakpoints={{ 1536: { spaceBetween: 7 } }}
          onSlideChange={forceUpdate}
          className="!container"
          loopAdditionalSlides={perPage}
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
