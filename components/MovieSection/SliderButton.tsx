import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

interface SliderButtonProps {
  type: "previous" | "next";
  swapPage: (type: "previous" | "next") => void;
}

export const SliderButton: React.FC<SliderButtonProps> = ({
  type,
  swapPage,
}) => {
  return (
    <button
      className={classNames(
        "group absolute z-10 flex h-full w-[3vw] items-center justify-center transition-colors duration-300 hover:bg-black/25",
        type === "next" ? "right-0" : "left-0",
      )}
      onClick={() => swapPage(type)}
    >
      <span className="sr-only">Slide to {type}</span>

      <FontAwesomeIcon
        icon={type === "previous" ? faAngleLeft : faAngleRight}
        className="w-1/2 transform transition-transform duration-300 group-hover:scale-110"
      />
    </button>
  );
};
