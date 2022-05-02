import { faBell, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";

export const Notifications: React.FC = () => {
  return (
    <Popover className="relative flex items-center justify-center">
      <Popover.Button className="aspect-square w-4 transition-colors duration-300 hover:text-navbar-text-hover lg:w-5">
        <FontAwesomeIcon icon={faBell} />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition transform ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition transform ease-out"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
      >
        <Popover.Panel className="absolute top-full right-0 z-40 w-60 translate-y-6 transform xs:w-80 sm:w-96">
          <div className="absolute -top-2.5 right-0.5 -z-10 aspect-square w-3 text-white/75 xs:right-0 xs:-top-3.5 xs:w-4">
            <FontAwesomeIcon icon={faCaretUp} />
          </div>

          <ul className="flex w-full flex-col border border-white/25 bg-black/75 before:absolute before:inset-x-0 before:top-0 before:rounded before:border-t-2 before:border-white/75">
            <li>
              <Link href="#">
                <a className="flex gap-5 p-4 transition-colors duration-300 hover:bg-black">
                  <div className="flex w-1/2 items-center justify-center ">
                    <div className="relative z-10 before:absolute before:inset-0 before:-z-10 before:rounded before:bg-[#c2c2be] before:shadow after:absolute after:inset-0 after:-z-20 after:translate-x-1 after:translate-y-1 after:transform after:rounded after:bg-[#dbdbd7] after:shadow">
                      <img
                        src="/images/hourglass_tcard.png"
                        alt="Hourglass Card"
                        className="translate w-full -translate-x-1 -translate-y-1 rounded object-cover shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-notifications-text transition-colors hover:text-white xs:text-sm sm:text-base">
                      What's Leaving Netflix Soon Last chance to watch.
                    </div>

                    <span className="text-[11px] text-notifications-date-text xs:text-xs">
                      1 month ago
                    </span>
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
