import {
  faBell,
  faCaretDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Logo } from "./Logo";

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
    label: "Shows",
    route: "#",
  },
  {
    label: "Movies",
    route: "#",
  },
  {
    label: "Latest",
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
        "fixed top-0 py-5 flex justify-between container w-full",
        shouldHaveBgColor
          ? "bg-background"
          : "bg-gradient-to-b bg-transparent from-black/70 to-black/0",
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
                        ? "text-white cursor-default font-medium"
                        : "text-navbar-text hover:text-navbar-text-hover cursor-pointer",
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
        <button className="aspect-square w-5">
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <button className="aspect-square w-5">
          <FontAwesomeIcon icon={faBell} />
        </button>

        <button className="flex items-center gap-2.5 group">
          <img
            src="/profile-image.png"
            alt="User profile image"
            className="rounded w-8 aspect-square"
          />

          <span className="aspect-square w-2.5 group-hover:rotate-180 transform transition-transform duration-300">
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </button>
      </div>
    </header>
  );
};