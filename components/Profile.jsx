import { GetUserName } from "./GetUserName";
import { Grid, User, Popover, Text } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Profile(params) {
  const user = GetUserName();
  const [userData, setUserData] = useState(null);

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
        setUserData(response);
      } else {
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  return (
    <>
      <div class="card rounded-5 mt-5 mb-3 border-warning bg-grey d-lg-none">
        <div class="card-body shadow text-dm">
          <Popover>
            <Popover.Trigger>
              <h5 className="mb-0">
                <User
                  as="button"
                  text={user.name}
                  name={user.name}
                  description={user.username}
                />
              </h5>
            </Popover.Trigger>
            <Popover.Content css={{ px: "$4", py: "$2" }} className="bg-dark">
              <Grid.Container
                className="text-dm"
                css={{
                  mw: "270px",
                  borderRadius: "$lg",
                  padding: "$sm",
                }}
              >
                <User
                  text={user.name}
                  name={user.name}
                  description={user.username}
                  css={{ px: 0 }}
                  className="pb-2"
                />

                <Grid.Container>
                  <Grid xs={12}>
                    <Text size={14} css={{ mt: "$1" }} color="#888888">
                      Temporary not changable description, will allow users to
                      create custom desc in future, lover she/her 🎉
                    </Text>
                  </Grid>
                </Grid.Container>

                <Grid.Container className="d-flex align-items-center justify-content-between">
                  <Text size={14} color="#888888">
                    <Text b color="foreground" size={14}>
                      {userData?.followers?.length}{" "}
                    </Text>
                    Followers
                  </Text>

                  <Text color="#888888" size={14}>
                    |
                  </Text>

                  <Text size={14} color="#888888">
                    <Text b color="foreground" size={14}>
                      {userData?.following?.length}{" "}
                    </Text>
                    Following
                  </Text>
                </Grid.Container>
              </Grid.Container>
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </>
  );
}
