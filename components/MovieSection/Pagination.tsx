import { useMovieSectionContext } from "@/contexts/MovieSectionContext";
import classNames from "classnames";
import React from "react";

export const Pagination: React.FC = () => {
  const { active, totalPages, activePage } = useMovieSectionContext();

  return (
    <ol className={active ? "flex items-center gap-0.5" : "hidden"}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li
          key={page}
          className={classNames(
            "h-0.5 w-3",
            activePage === page
              ? "bg-movie-section-pagination-indicator-active"
              : "bg-movie-section-pagination-indicator",
          )}
        >
          <span className="sr-only">Indicator for page: {page}</span>
        </li>
      ))}
    </ol>
  );
};
