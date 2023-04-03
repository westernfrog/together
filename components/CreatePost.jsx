import { Avatar, Button, Grid, Popover, Text, User } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GetUserName } from "./GetUserName";
import { GetProfileData } from "./GetProfileData";

export default function CreatePost(props) {
  const router = useRouter();
  const userData = GetUserName();
  const userProfile = GetProfileData();
  const [text, setText] = useState("");
  const [numPosts, setNumPosts] = useState(0);

  const handleFormChange = async (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (userData.username) {
      const response = await fetch("/api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          username: userData.username,
          name: userData.name,
        }),
      });
      if (response.ok) {
        setText("");
        props.setNumPosts(props.numPosts);
      } else {
        console.error("Failed to create post");
      }
    } else {
      router.push({
        pathname: "/login",
      });
    }
  };

  return (
    <>
      <div className="border-bottom border-dark d-lg-block d-none">
        <div className="mt-5 mb-3 pb-4 pt-5">
          <h2 className="text-dm fw-bold text-shadow-3">
            Hello, {props.name} 😍
          </h2>
          <div className="mt-3">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label text-dm"
            >
              Share your thoughts or ask for any answers!
            </label>
            <div className="d-flex align-items-start justify-content-between gap-2 my-2">
              <Popover>
                <Popover.Trigger>
                  <Avatar
                    text={userProfile?.name}
                    size="lg"
                    color={"gradient"}
                  />
                </Popover.Trigger>
                <Popover.Content
                  css={{ px: "$4", py: "$2" }}
                  className="bg-dark"
                >
                  <Grid.Container
                    className="text-dm"
                    css={{
                      mw: "270px",
                      borderRadius: "$lg",
                      padding: "$sm",
                    }}
                  >
                    <User
                      text={userData?.name}
                      name={userData?.name}
                      description={userData?.username}
                      className="px-0 mb-2"
                    />
                    <Grid.Container>
                      <Grid xs={12}>
                        <Text size={14} css={{ mt: "$1" }} color="#888888">
                          Temporary not changable description, will allow users
                          to create custom desc in future, lover she/her 🎉
                        </Text>
                      </Grid>
                    </Grid.Container>

                    <Grid.Container className="d-flex align-items-center justify-content-between">
                      <Text size={14} color="#888888">
                        <Text b color="foreground" size={14}>
                          {userProfile?.followers?.length}{" "}
                        </Text>
                        Followers
                      </Text>

                      <Text color="#888888" size={14}>
                        |
                      </Text>

                      <Text size={14} color="#888888">
                        <Text b color="foreground" size={14}>
                          {userProfile?.following?.length}{" "}
                        </Text>
                        Following
                      </Text>
                    </Grid.Container>
                  </Grid.Container>
                </Popover.Content>
              </Popover>
              <div className="w-100">
                <textarea
                  className="form-control rounded-4 border-purple shadow-sm text-white text-dm bg-grey"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="Your Message!"
                  value={text}
                  onChange={handleFormChange}
                  style={{ resize: "none" }}
                ></textarea>
                <Button
                  auto
                  flat
                  color={"secondary"}
                  className="my-2 text-dm"
                  onPress={handleSubmit}
                >
                  Post! 📩
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
