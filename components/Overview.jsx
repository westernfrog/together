import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "./Footer";

export default function Overview(params) {
  const [activeButton, setActiveButton] = useState("Home");

  const handleNavClick = (label) => {
    setActiveButton(label);
  };
  return (
    <>
      <div className="container my-4 d-lg-block d-none">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="d-flex gap-3 py-3 bg-grey mb-3 px-3 rounded">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/774/774122.png"
                  alt=""
                  width={40}
                  height={40}
                  class="rounded-circle flex-shrink-0"
                />
                <div class="d-flex w-100 justify-content-between">
                  <div>
                    <h6 class="mb-0">Aman Singh</h6>
                    <p class="mb-0 opacity-75">@westernfrog</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-2 col-lg-1 me-3 me-xl-0">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/774/774122.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
                <div className="col-8 col-lg-8 text-dm d-flex align-items-center">
                  <div className="input-group">
                    <textarea
                      className="form-control rounded-4 bg-grey fs-7 p-2 text-center shadow-sm text-light"
                      aria-label="With textarea"
                      placeholder="Share anything you want."
                      rows={2}
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-2 col-lg-1 ps-0">
                  <button className="btn bg-grey btn-sm btn-shrink rounded py-3 px-4 text-light">
                    <i class="fa-regular fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row">
            <div className="col-3">
              <div class="d-flex flex-column flex-shrink-0 text-white bg-transparent">
                <ul class="nav flex-column mb-auto bg-grey rounded py-2">
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
                            {
                              <i
                                className={`fa-solid fa-${icon} fa-lg me-4`}
                              ></i>
                            }
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
            </div>
            <div className="col-6">
              <div className="bg-grey rounded ms-4 py-5 mb-3">hh</div>
              <div className="bg-grey rounded ms-4 py-5 mb-3">hh</div>
              <div className="bg-grey rounded ms-4 py-5 mb-3">hh</div>
              <div className="bg-grey rounded ms-4 py-5 mb-3">hh</div>
              <div className="bg-grey rounded ms-4 py-5 mb-3">hh</div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
