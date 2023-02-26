import Link from "next/link";
// import { useState } from "react";

export default function Header() {
  // const [activeButton, setActiveButton] = useState("Home");

  // const handleNavClick = (label) => {
  //   setActiveButton(label);
  // };

  return (
    <>
      <div className="bg-header">
        <nav className="container navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid pt-3 px-0 mx-3">
            <Link className="navbar-brand text-dancing fs-2" href="/">
              Together
            </Link>
            <div>
              <Link href="/feed">
                <button
                  className="navbar-toggler me-1 py-2 rounded shadow-sm btn-shrink"
                  type="button"
                >
                  <i className="fa-solid fa-fire fa-sm"></i>
                </button>
              </Link>
              <Link href="/guestbook">
                <button
                  className="navbar-toggler ms-1 py-2 rounded shadow-sm btn-shrink"
                  type="button"
                >
                  <i className="fa-solid fa-earth-americas fa-sm"></i>
                </button>
              </Link>
            </div>

            <div className="collapse navbar-collapse">
              {/* <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                {[
                  { href: "/", label: "Home" },
                  { href: "/feed", label: "Feed" },
                  { href: "/guestbook", label: "Guestbook" },
                  { href: "/about", label: "About Us" },
                ].map(({ href, label }, index) => (
                  <li className="nav-item" key={index}>
                    <Link
                      href={href}
                      className={`nav-link text-light rounded-3 px-4 py-1 ${
                        activeButton === label ? "bg-nav" : ""
                      }`}
                      onClick={() => handleNavClick(label)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
