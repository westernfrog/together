import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export function GetUserName() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      setUserData(decoded);
    }
  }, []);

  return userData;
}
