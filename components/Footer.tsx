import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

interface FooterLink {
  label: string;
  route: string;
}

const footerLinks: FooterLink[] = [
  {
    label: "Audio and Subtitles",
    route: "#",
  },
  {
    label: "Audio Description",
    route: "#",
  },
  {
    label: "Help Center",
    route: "#",
  },
  {
    label: "Gift Cards",
    route: "#",
  },
  {
    label: "Media Center",
    route: "#",
  },
  {
    label: "Investor Relations",
    route: "#",
  },
  {
    label: "Jobs",
    route: "#",
  },
  {
    label: "Terms of Use",
    route: "#",
  },
  {
    label: "Privacy",
    route: "#",
  },
  {
    label: "Legal Notices",
    route: "#",
  },
  {
    label: "Cookie Preferences",
    route: "#",
  },
  {
    label: "Corporate Information",
    route: "#",
  },
  {
    label: "Contact Us",
    route: "#",
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mx-auto mt-auto flex w-full max-w-[980px] flex-col gap-5 py-5 px-4 text-[13px] text-footer-text">
      <div className="ml-4 flex items-center gap-8 text-white">
        <a
          href="https://www.facebook.com/netflix"
          target="_blank"
          className="aspect-square w-3.5"
          aria-label="Facebook"
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </a>

        <a
          href="https://www.instagram.com/Netflix"
          target="_blank"
          className="aspect-square w-5"
          aria-label="Instagram"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>

        <a
          href="https://twitter.com/Netflix"
          target="_blank"
          className="aspect-square w-6"
          aria-label="Twitter"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>

        <a
          href="https://www.youtube.com/user/NewOnNetflix"
          target="_blank"
          className="aspect-square w-6"
          aria-label="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>

      <nav>
        <ul className="grid grid-cols-2 gap-y-3 gap-x-2 md:grid-cols-3 lg:grid-cols-4">
          {footerLinks.map(({ label, route }) => (
            <li key={label + route}>
              <Link href={route}>
                <a className="hover:underline">{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button className="w-max border border-footer-text py-1 px-1.5 transition-colors hover:text-white">
        Service Code
      </button>

      <p className="text-[11px]">
        &copy; 1997-{new Date().getFullYear()} Netflix, Inc.
      </p>
    </footer>
  );
};
