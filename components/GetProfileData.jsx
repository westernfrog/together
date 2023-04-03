import { useState, useEffect } from "react";
import { GetUserName } from "./GetUserName";

export function GetProfileData() {
  const user = GetUserName();
  const [userProfile, setUserProfile] = useState(null);

  const username = user.username;

  const fetchData = async () => {
    if (username) {
      const data = { username };
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (res.status === 200) {
        setUserProfile(response);
      } else {
        setUserProfile(null);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  return userProfile;
}
