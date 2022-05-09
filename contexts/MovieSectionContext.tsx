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
  totalPages: number;
  swapPage: (type: "previous" | "next") => void;
  initialSlide: number;
  perPage: number;
  activePage: number;
  updateActiveIndex: () => void;
  hasMoved: boolean;
  updateHasMoved: () => void;
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
  const [hasMoved, setHasMoved] = useState(false);
  const [active, setActive] = useState(false);
  const breakpoint = useBreakpoint();
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const sliderRef = useRef<HTMLDivElement & { swiper: SwiperType }>(null);

  const updateActiveIndex: IMovieSectionContext["updateActiveIndex"] =
    useCallback(() => {
      setActiveIndex(sliderRef.current?.swiper.realIndex || 0);
    }, [sliderRef.current]);

  const updateHasMoved: IMovieSectionContext["updateHasMoved"] =
    useCallback(() => {
      if (!hasMoved) {
        setHasMoved(true);
      }
    }, [hasMoved]);

  useUpdateEffect(() => {
    if (!hasMoved) {
      updateActiveIndex();
    }
  }, [sliderRef.current?.swiper.realIndex]);

  const perPage: IMovieSectionContext["perPage"] = useMemo(
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

  const totalPages: IMovieSectionContext["totalPages"] = useMemo(
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

      updateHasMoved();
    },
    [sliderRef.current],
  );

  const activePage: IMovieSectionContext["activePage"] = useMemo(
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
        totalPages,
        swapPage,
        initialSlide,
        perPage,
        sliderRef,
        updateActiveIndex,
        activePage,
        updateHasMoved,
        hasMoved,
      }}
    >
      {children}
    </MovieSectionContext.Provider>
  );
};

export const useMovieSectionContext = () => useContext(MovieSectionContext);
