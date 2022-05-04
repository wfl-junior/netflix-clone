import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const Search: React.FC = () => {
  const [open, _setOpen] = useState(false);
  const [animating, setAnimating] = useState(open);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // this instead of useEffect to take advantage of state batching
  const setOpen = useCallback((_open: typeof open) => {
    _setOpen(_open);

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      setAnimating(true);
    }
  }, []);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && !query) {
        setOpen(false);
      }
    }

    if (open) {
      const eventToListenTo: keyof WindowEventMap = "keydown";
      window.addEventListener(eventToListenTo, handleKeydown);
      return () => window.removeEventListener(eventToListenTo, handleKeydown);
    }
  }, [open, query]);

  return open || animating ? (
    <div className="relative z-30">
      <div className="absolute right-0 w-52 -translate-y-1/2 transform xs:w-72">
        <div
          className={classNames(
            "flex items-center overflow-hidden border border-white bg-black/75 px-2",
            { "motion-safe:animate-grow-search-bar": animating },
          )}
          style={{ animationDirection: open ? "normal" : "reverse" }}
          onAnimationEnd={() => setAnimating(false)}
        >
          <label htmlFor="search-input" className="aspect-square w-4">
            <span className="sr-only">Search...</span>
            <FontAwesomeIcon icon={faSearch} />
          </label>

          <input
            ref={inputRef}
            id="search-input"
            type="text"
            placeholder="Titles, people, genres"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            onBlur={() => {
              if (!query) {
                setOpen(false);
              }
            }}
            className="w-full bg-transparent px-2 py-1.5 text-sm text-white focus:outline-none"
          />

          <button
            className={classNames(
              "aspect-square w-3.5 transition-colors duration-300 hover:text-navbar-text-hover",
              { "pointer-events-none": !query },
            )}
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            {query && <FontAwesomeIcon icon={faXmark} />}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <button
      onClick={() => setOpen(true)}
      className="aspect-square w-4 transition-colors duration-300 hover:text-navbar-text-hover lg:w-5"
    >
      <FontAwesomeIcon icon={faSearch} />
    </button>
  );
};
