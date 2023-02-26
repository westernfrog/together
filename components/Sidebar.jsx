import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "./Footer";

export default function Sidebar(params) {
  const [activeButton, setActiveButton] = useState("Home");

  const handleNavClick = (label) => {
    setActiveButton(label);
  };

  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 text-white bg-transparent">
        <ul className="nav flex-column mb-auto bg-grey rounded py-2">
          {[
            { href: "/", label: "Home", icon: "house" },
            { href: "/feed", label: "Feed", icon: "fire" },
            {
              href: "/guestbook",
              label: "Guestbook",
              icon: "earth-americas",
            },
            { href: "/profile", label: "My profile", icon: "user" },
            {
              href: "/about",
              label: "About Us",
              icon: "wand-magic-sparkles",
            },
          ].map(({ href, label, icon }, index) => (
            <li className="nav-item my-2 btn-shrink" key={index}>
              <Link
                href={href}
                className={`nav-link text-light rounded-3 px-4 py-2 ${
                  activeButton === label ? "bg-nav" : ""
                }`}
                onClick={() => handleNavClick(label)}
              >
                <div className="row">
                  <div className="col-2">
                    {<i className={`fa-solid fa-${icon} fa-lg me-4`}></i>}
                  </div>
                  <div className="col-8">{label}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <Footer />
      </div>
    </>
  );
}
