import React from "react";
import SocialLink from "./social-link";
import AppLogo from "../AppLogo";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex gap-8 p-[20px] flex-col space-y-8  max-w-screen mx-auto text-white bg-gradient-to-b from-pink-200 to-pink-500">
      <AppLogo />
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:gap-[1,5rem]  md:space-x-8">
        <div className="flex flex-col text-white gap-4">
          <div className="ml-[24px] text-center ">
            <h1 className=" underline text-[1.5rem] font-bold mb-4">
              Information Sur notre boutique
            </h1>
            <p className="font-semibold text-sm">
              Nom de la boutique:{"  "}
              <span className="font-normal ">Elegance Catel</span>
            </p>
            <p className="font-semibold text-sm">
              Address:{"  "}
              <span className="font-normal ">Elegance Catel</span>
            </p>
            <p className="font-semibold text-sm">
              Email:{"  "}
              <span className="font-normal ">Elegance Catel</span>
            </p>
            <p className="font-semibold text-sm">
              Telephone:{"  "}
              <span className="font-normal ">Elegance Catel</span>
            </p>
          </div>{" "}
        </div>
        <div>
          <h1 className="font-bold underline mb-4 text-[1.5rem]">
            Support clients
          </h1>
          <ul>
            <li>
              <Link href="#">FAQS</Link>
            </li>
            <li>
              <Link href="#">Politique de retour</Link>
            </li>
            <li>
              <Link href="#">Suivi de command</Link>
            </li>
            <li>
              <Link href="#">Assistance</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex w-full items-center justify-center space-y-4 flex-col">
        <SocialLink />

        <p>&copy; Elegance Catel 2024. Tous droits réservés.</p>
      </div>
    </footer>
  );
};
