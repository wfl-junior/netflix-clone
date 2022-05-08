import { useMovieSectionContext } from "@/contexts/MovieSectionContext";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

interface SliderButtonProps {
  type: "previous" | "next";
}

export const SliderButton: React.FC<SliderButtonProps> = ({ type }) => {
  const { active, swapPage } = useMovieSectionContext();

  return (
    <button
      className={classNames(
        "group absolute z-10 flex h-full w-[var(--container-padding)] items-center justify-center bg-background/50 transition-colors duration-300 hover:bg-background/75 focus-visible:bg-background/75",
        type === "previous" ? "left-0 rounded-r-sm" : "right-0 rounded-l-sm",
      )}
      onClick={() => swapPage(type)}
    >
      <span className="sr-only">Slide to {type}</span>

      {active && (
        <FontAwesomeIcon
          icon={type === "previous" ? faAngleLeft : faAngleRight}
          className="w-2/5 transform transition-transform duration-300 group-hover:scale-110"
        />
      )}
    </button>
  );
};
