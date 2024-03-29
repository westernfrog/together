import { Button, Loading, User } from "@nextui-org/react";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { GetUserName } from "./GetUserName";

export default function SuggestedCard(props) {
  const data = GetUserName();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [numPosts, setNumPosts] = useState(0);
  const [loadingStates, setLoadingStates] = useState({});

  const username = data.username;

  useEffect(() => {
    async function fetchData() {
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
          setUserData(response);
        } else {
          setUserData(null);
        }
      }
    }

    fetchData();
  }, [username, numPosts]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      const filteredUsers = data
        .filter((user) => user.username !== currentUser?.username)
        .filter((user) => !userData?.following?.includes(user.username));
      setUsers(filteredUsers);
    }

    fetchUsers();
  }, [currentUser, userData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      setCurrentUser(decoded);
    }
  }, []);

  const handleFollow = async (username) => {
    if (currentUser) {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [username]: true,
      }));

      const data = { username: currentUser.username };
      const res = await fetch(`/api/follow/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setNumPosts(numPosts + 1);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.username === username
            ? { ...user, following: !user.following }
            : user
        )
      );

      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [username]: false,
      }));
    }
  };

  const isFollowingUser = (username) => {
    if (userData && userData.following) {
      return userData.following.includes(username);
    }
    return false;
  };

  return (
    <>
      {users.map((user, index) => (
        <div
          className="card my-4 bg-grey text-light text-dm rounded-5 shadow-sm border-dark"
          key={index}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-sm">
                <User
                  size="md"
                  color={"gradient"}
                  text={user.name}
                  name={user.name}
                  description={user.username}
                  className="ps-0"
                />
              </div>
              <div className="col-sm mt-2 mt-lg-0 d-flex align-items-center justify-content-md-end">
                {currentUser && !isFollowingUser(user.username) && (
                  <Button
                    auto
                    flat
                    rounded
                    color={"secondary"}
                    size={"sm"}
                    onPress={() => handleFollow(user.username)}
                  >
                    {loadingStates[user.username] ? (
                      <Loading
                        type="points-opacity"
                        color="currentColor"
                        size="sm"
                      />
                    ) : (
                      <>Follow</>
                    )}
                  </Button>
                )}
                {currentUser && isFollowingUser(user.username) && (
                  <Button
                    auto
                    flat
                    color={"secondary"}
                    size={"sm"}
                    onPress={() => handleFollow(user.username)}
                  >
                    {loadingStates[user.username] ? (
                      <Loading
                        type="points-opacity"
                        color="currentColor"
                        size="sm"
                      />
                    ) : (
                      <>Following</>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
