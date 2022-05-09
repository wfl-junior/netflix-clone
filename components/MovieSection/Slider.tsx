import { useMovieSectionContext } from "@/contexts/MovieSectionContext";
import { getBackdropImagePrefix } from "@/utils/getBackdropImagePrefix";
import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderButton } from "./SliderButton";

export const Slider: React.FC = () => {
  const {
    movies,
    setActive,
    totalPages,
    perPage,
    hasMoved,
    initialSlide,
    sliderRef,
    updateActiveIndex,
    updateHasMoved,
  } = useMovieSectionContext();

  return (
    <div
      className="relative"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {hasMoved ? (
        <SliderButton type="previous" />
      ) : (
        <div
          className="absolute left-0 z-10 h-full w-[var(--container-padding)] bg-background"
          aria-hidden="true"
        ></div>
      )}

      <SliderButton type="next" />

      <Swiper
        // @ts-ignore
        ref={sliderRef}
        loop
        spaceBetween={5}
        slidesPerView={perPage}
        slidesPerGroup={perPage}
        speed={750}
        className="!container"
        breakpoints={{ 1536: { spaceBetween: 7 } }}
        initialSlide={initialSlide}
        onSlideChangeTransitionEnd={() => updateActiveIndex()}
        onSlideChange={swiper => {
          if (swiper.touches.diff) {
            updateHasMoved();
          }
        }}
      >
        {movies
          .slice(0, movies.length - (movies.length % totalPages))
          .map(movie => (
            <SwiperSlide key={movie.id}>
              {movie.backdrop_path ? (
                <img
                  src={getBackdropImagePrefix("w500") + movie.backdrop_path}
                  alt={`Backdrop image for the movie ${movie.title}`}
                  className="aspect-video max-w-full cursor-pointer rounded object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex aspect-video max-w-full items-center justify-center rounded bg-black/50">
                  <h3 className="text-center text-xs sm:text-sm lg:text-base">
                    {movie.title}
                  </h3>
                </div>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
