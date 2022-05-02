import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { Notifications } from "./Notifications";

interface NavLink {
  label: string;
  route: string;
}

const navLinks: NavLink[] = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "TV Shows",
    route: "#",
  },
  {
    label: "Movies",
    route: "#",
  },
  {
    label: "New & Popular",
    route: "#",
  },
  {
    label: "My List",
    route: "#",
  },
];

export const Header: React.FC = () => {
  const [shouldHaveBgColor, setShouldHaveBgColor] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    function listener() {
      const bool = window.scrollY > 0;

      if (bool !== shouldHaveBgColor) {
        setShouldHaveBgColor(bool);
      }
    }

    document.addEventListener("scroll", listener);
    return () => document.removeEventListener("scroll", listener);
  }, []);

  return (
    <header
      className={classNames(
        "container fixed top-0 z-50 flex w-full justify-between py-5",
        shouldHaveBgColor
          ? "bg-background"
          : "bg-transparent bg-gradient-to-b from-black/70 to-black/0",
      )}
    >
      <div className="flex items-center gap-10">
        <Link href="/">
          <a>
            <Logo className="w-24" />
          </a>
        </Link>

        <nav>
          <ul className="flex items-center gap-5">
            {navLinks.map(({ label, route }) => (
              <li key={label + route}>
                <Link href={route}>
                  <a
                    className={classNames(
                      "text-sm transition-colors duration-300",
                      pathname === route
                        ? "cursor-default font-medium text-white"
                        : "cursor-pointer text-navbar-text hover:text-navbar-text-hover",
                    )}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-8">
        <button className="aspect-square w-5 transition-colors duration-300 hover:text-navbar-text-hover">
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <Notifications />

        <button className="group flex items-center gap-2.5">
          <img
            src="/images/profile-image.png"
            alt="User profile image"
            className="aspect-square w-8 rounded"
          />

          <span className="aspect-square w-2.5 transform transition-transform duration-300 group-hover:rotate-180">
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </button>
      </div>
    </header>
  );
};
