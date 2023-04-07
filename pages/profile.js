import { GetUserName } from "@/components/GetUserName";
import Suggested from "@/components/Suggested";
import { useState, useEffect } from "react";
import { Button, Spacer, User } from "@nextui-org/react";

export default function Profile(params) {
  const userName = GetUserName();
  const [userData, setUserData] = useState(null);

  const username = userName.username;

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
        setUserData(response); // Store the user data in the state variable
      } else {
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  console.log(userData?.name);

  return (
    <>
      <div className="row">
        <Spacer y={3} />
        <div className="col-md-8 mt-0 mt-lg-4">
          <div class="card bg-grey my-5 border-warning rounded-5">
            <div class="card-body text-dm py-3 p-lg-4">
              <div class="card-title">
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-md-6">
                    <User
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      name="Ariana Wattson"
                      description="UI/UX Designer @Github"
                      className="px-0 fs-8"
                    />
                  </div>
                  <div className="col-md-2 my-3 my-lg-0">
                    <Button
                      auto
                      flat
                      color={"secondary"}
                      size={"xs"}
                      className="ms-auto w-100"
                    >
                      Edit profile
                      <i className="fa-solid fa-user ms-2"></i>
                    </Button>
                  </div>
                </div>
              </div>
              <p class="card-text text-muted">
                Some quick example text to build on the card title and make up
                the bulk of the cards content.
              </p>
            </div>
            <div className="card-footer text-dm py-3 p-lg-4">
              <div className="row d-flex align-items-start justify-content-between">
                <div
                  className="col-md-5 overflow-auto"
                  style={{ height: "280px" }}
                >
                  <p className="text-muted">
                    <span className="fw-bold">4</span> Followers 🎉
                  </p>
                  {userData?.followers.map((followers, index) => (
                    <div
                      className="card my-4 bg-grey text-light text-dm rounded-5 shadow-sm border-dark"
                      key={index}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm">
                            <User
                              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                              name={followers}
                              className="px-0"
                            />
                          </div>
                          <div className="col-3"></div>
                          <div className="col-sm mt-2 mt-lg-0 d-flex align-items-center justify-content-md-end">
                            <Button
                              auto
                              flat
                              color={"secondary"}
                              size={"sm"}
                              className="w-100 mt-2"
                            >
                              <>Following</>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-md-5 mt-5 mt-lg-0">
                  <p className="text-muted">
                    <span className="fw-bold">4</span> Followers 🎉
                  </p>
                  <div className="card my-4 bg-grey text-light text-dm rounded-5 shadow-sm border-dark">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm">
                          <User
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            name="Ariana Wattson"
                            description="UI/UX Designer @Github"
                            className="px-0"
                          />
                        </div>
                        <div className="col-sm mt-2 mt-lg-0 d-flex align-items-center justify-content-md-end">
                          <Button
                            auto
                            flat
                            color={"secondary"}
                            size={"sm"}
                            className="w-100 mt-2"
                          >
                            <>Following</>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="position-sticky" style={{ top: "9rem" }}>
            {userName && <Suggested username={userName.username} />}
          </div>
        </div>
      </div>
    </>
  );
}
