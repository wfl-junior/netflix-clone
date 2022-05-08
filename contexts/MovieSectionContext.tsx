import { MovieSectionProps } from "@/components/MovieSection";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { match } from "@/utils/match";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type SwiperType from "swiper";

interface IMovieSectionContext extends MovieSectionProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstScroll: React.MutableRefObject<boolean>;
  totalPages: number;
  swapPage: (type: "previous" | "next") => void;
  initialSlide: number;
  perPage: number;
  activePage: number;
  updateActiveIndex: () => void;
  sliderRef: React.RefObject<
    HTMLDivElement & {
      swiper: SwiperType;
    }
  >;
}

interface MovieSectionContextProviderProps extends MovieSectionProps {
  children?: React.ReactNode;
}

const MovieSectionContext = createContext({} as IMovieSectionContext);

const initialSlide = 0;

export const MovieSectionContextProvider: React.FC<
  MovieSectionContextProviderProps
> = ({ children, movies, ...props }) => {
  const isFirstScroll = useRef(true);
  const [active, setActive] = useState(false);
  const breakpoint = useBreakpoint();
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const sliderRef = useRef<HTMLDivElement & { swiper: SwiperType }>(null);

  const updateActiveIndex: IMovieSectionContext["updateActiveIndex"] =
    useCallback(() => {
      setActiveIndex(sliderRef.current?.swiper.realIndex || 0);
    }, [sliderRef.current]);

  useUpdateEffect(() => {
    if (isFirstScroll.current) {
      updateActiveIndex();
    }
  }, [sliderRef.current?.swiper.realIndex]);

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

  const swapPage: IMovieSectionContext["swapPage"] = useCallback(
    type => {
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
    [sliderRef.current],
  );

  const activePage = useMemo(
    () => Math.floor(activeIndex / perPage + 1),
    [activeIndex, perPage],
  );

  return (
    <MovieSectionContext.Provider
      value={{
        ...props,
        movies,
        active,
        setActive,
        isFirstScroll,
        totalPages,
        swapPage,
        initialSlide,
        perPage,
        sliderRef,
        updateActiveIndex,
        activePage,
      }}
    >
      {children}
    </MovieSectionContext.Provider>
  );
};

export const useMovieSectionContext = () => useContext(MovieSectionContext);
