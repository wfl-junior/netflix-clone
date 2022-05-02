import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faPenToSquare,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import React, { Fragment } from "react";

interface Link {
  label: string;
  route: string;
}

interface ProfileLink extends Link {
  imagePath: string;
}

const profileLinks: ProfileLink[] = [
  {
    label: "Profile 1",
    route: "#",
    imagePath: "profile-image-1.png",
  },
  {
    label: "Profile 2",
    route: "#",
    imagePath: "profile-image-2.png",
  },
  {
    label: "Profile 3",
    route: "#",
    imagePath: "profile-image-3.png",
  },
  {
    label: "Profile 4",
    route: "#",
    imagePath: "profile-image-4.png",
  },
];

interface ExtraLink extends Link {
  icon: IconProp;
}

const extraLinks: ExtraLink[] = [
  {
    label: "Account",
    route: "#",
    icon: faUser,
  },
  {
    label: "Help Center",
    route: "#",
    icon: faQuestionCircle,
  },
];

const ProfileLink: React.FC<Link & { children?: React.ReactNode }> = ({
  children,
  label,
  route,
}) => (
  <Menu.Item as="li" key={label + route}>
    {({ active }) => (
      <Link href={route}>
        <a
          className={classNames(
            "flex cursor-pointer items-center gap-3 px-2.5 py-3 transition-colors duration-300",
            { "bg-black": active },
          )}
        >
          <div className="flex w-10 items-center justify-center">
            {children}
          </div>

          <span
            className={classNames("text-xs text-white sm:text-sm", {
              underline: active,
            })}
          >
            {label}
          </span>
        </a>
      </Link>
    )}
  </Menu.Item>
);

export const Profile: React.FC = () => {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="flex items-center gap-2.5">
            <img
              src="/images/profile-image.png"
              alt="User profile image"
              className="aspect-square w-7 rounded object-cover xs:w-8"
            />

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
            <Menu.Items className="absolute top-full right-0 z-40 w-48 translate-y-4 transform divide-y divide-white/20 border border-white/10 bg-black/80">
              <ul className="flex flex-col py-2" role="navigation">
                {profileLinks.map(({ label, route, imagePath }) => (
                  <ProfileLink key={label + route} label={label} route={route}>
                    <div className="flex w-8 items-center justify-center">
                      <img
                        src={`/images/${imagePath}`}
                        alt=""
                        className="w-full rounded object-cover"
                      />
                    </div>
                  </ProfileLink>
                ))}

                <ProfileLink label="Manage Profiles" route="#">
                  <div className="flex aspect-square w-5 items-center justify-center text-profile-icon">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                </ProfileLink>
              </ul>

              <ul className="flex flex-col py-2" role="navigation">
                {extraLinks.map(({ label, route, icon }) => (
                  <ProfileLink key={label + route} label={label} route={route}>
                    <div className="flex aspect-square w-5 items-center justify-center text-profile-icon">
                      <FontAwesomeIcon icon={icon} />
                    </div>
                  </ProfileLink>
                ))}
              </ul>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
};
