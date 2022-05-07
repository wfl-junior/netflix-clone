import { useBreakpoint } from "@/hooks/useBreakpoint";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

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

export const Navigation: React.FC = () => {
  const { pathname } = useRouter();
  const isLargeScreen = useBreakpoint("lg");

  return isLargeScreen ? (
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
  ) : (
    <Menu as="div" className="relative">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="flex items-center gap-2 text-xs">
            <span>Browse</span>

            <span
              className={classNames(
                "aspect-square w-2.5 transform transition-transform duration-300",
                { "rotate-180": open },
              )}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition transform ease-out"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition transform ease-out"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Menu.Items className="absolute top-full right-1/2 z-40 w-64 translate-y-[10%] translate-x-[58%] transform xs:w-72">
              <div className="absolute -top-3.5 left-1/2 -z-10 aspect-square w-4 -translate-x-1/2 transform text-white/75">
                <FontAwesomeIcon icon={faCaretUp} />
              </div>

              <nav>
                <ul className="flex flex-col border border-white/20 bg-black/75 before:absolute before:inset-x-0 before:top-0 before:border-t-2 before:border-white/75">
                  {navLinks.map(({ label, route }) => {
                    const isCurrentRoute = pathname === route;

                    return (
                      <Menu.Item as="li" key={label + route}>
                        {({ active }) => (
                          <Link href={route}>
                            <a
                              className={classNames(
                                "block py-4 text-center text-xs transition-colors duration-300 sm:text-sm",
                                isCurrentRoute
                                  ? "cursor-default font-medium text-white"
                                  : "cursor-pointer text-navbar-text",
                                {
                                  "bg-black": active,
                                  "text-navbar-text-hover":
                                    active && !isCurrentRoute,
                                },
                              )}
                            >
                              {label}
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    );
                  })}
                </ul>
              </nav>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
};
