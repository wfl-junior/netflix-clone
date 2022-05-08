import { useMovieSectionContext } from "@/contexts/MovieSectionContext";
import React from "react";

export const Title: React.FC = () => {
  const { title } = useMovieSectionContext();

  return (
    <h2 className="cursor-pointer text-xs font-bold text-movie-section-title transition-colors hover:text-white sm:text-sm md:text-base lg:text-[1.4vw]">
      {title}
    </h2>
  );
};
