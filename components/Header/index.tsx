import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { Navigation } from "./Navigation";
import { Notifications } from "./Notifications";
import { Profile } from "./Profile";

export const Header: React.FC = () => {
  const [shouldHaveBgColor, setShouldHaveBgColor] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const condition = window.scrollY > 0;

      if (condition !== shouldHaveBgColor) {
        setShouldHaveBgColor(condition);
      }
    }

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={classNames(
        "container fixed top-0 z-50 flex w-full justify-between py-2.5 lg:py-5",
        shouldHaveBgColor
          ? "bg-background"
          : "bg-transparent bg-gradient-to-b from-black/70 to-black/0",
      )}
    >
      <div className="flex items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-10">
        <Link href="/">
          <a>
            <Logo className="w-16 lg:w-24" />
          </a>
        </Link>

        <Navigation />
      </div>

      <div className="flex items-center gap-4 xs:gap-6 sm:gap-8">
        <button className="aspect-square w-4 transition-colors duration-300 hover:text-navbar-text-hover lg:w-5">
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <Notifications />
        <Profile />
      </div>
    </header>
  );
};
