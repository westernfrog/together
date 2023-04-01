import { useState, useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    const year = new Date().getFullYear();
    setnewYear(year);
  }, []);

  const [newYear, setnewYear] = useState(" ");

  return (
    <>
      <footer className="container">
        <div className="text-center text-muted lh-1">
          <p className="mb-0 fs-7">Made with 💜 in India</p>
          <p className="fs-7">&copy; {newYear} • Together</p>
        </div>
      </footer>
    </>
  );
}
