import Image from "next/image";
import Link from "next/link";
import React from "react";

const Links = [
  {
    icon: "/icons/facebook.svg",
    label: "facebook",
    href: "",
  },
  {
    icon: "/icons/twitter.svg",
    label: "twitter",
    href: "",
  },
  {
    icon: "/icons/instagram.svg",
    label: "instagram",
    href: "",
  },
];
const SocialLink = () => {
  return (
    <nav className="flex flex-row items-center gap-4">
      {Links.map((socialLink) => (
        <Link
          className="text-white"
          key={socialLink.label}
          href={socialLink.href}
        >
          <Image
            alt={socialLink.label}
            src={socialLink.icon}
            width={20}
            height={20}
            className="filter invert"
          />
        </Link>
      ))}
    </nav>
  );
};

export default SocialLink;
