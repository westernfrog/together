import Link from "next/link";
import { useState } from "react";

export default function ButtonArea(params) {
  const [activeButton, setActiveButton] = useState("one");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  return (
    <>
      <div className="my-4 d-flex d-lg-none align-items-center justify-content-around text-dm border border-dark py-4 px-2 rounded">
        <Link href="/">
          <button
            className={`btn btn-sm btn-shrink px-3 py-2 rounded-3 fs-8 text-light ${
              activeButton === "one" ? "bg-space" : ""
            }`}
            onClick={() => handleButtonClick("one")}
          >
            Recent
          </button>
        </Link>
        <Link href="/">
          <button
            className={`btn btn-sm btn-shrink px-3 py-2 rounded-3 fs-8 text-light ${
              activeButton === "two" ? "bg-space" : ""
            }`}
            onClick={() => handleButtonClick("two")}
          >
            Friends
          </button>
        </Link>
        <Link href="/">
          <button
            className={`btn btn-sm btn-shrink px-3 py-2 rounded-3 fs-8 text-light ${
              activeButton === "three" ? "bg-space" : ""
            }`}
            onClick={() => handleButtonClick("three")}
          >
            Newbies
          </button>
        </Link>
      </div>
    </>
  );
}
