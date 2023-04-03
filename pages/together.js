import { GetUserName } from "@/components/GetUserName";
import CreatePost from "@/components/CreatePost";
import Suggested from "@/components/Suggested";
import { Button, Grid, User, Popover, Spacer, Text } from "@nextui-org/react";
import Post from "@/components/Post";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreatePostModal from "@/components/CreatePostModal";

export default function Together() {
  const router = useRouter();
  const user = GetUserName();
  const [posts, setPosts] = useState([]);
  const [numPosts, setNumPosts] = useState(0);
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
        setUserData(response); // Store the user data in the state variable
      } else {
        setUserData(null);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  useEffect(() => {
    async function fetchPosts() {
      const postRes = await fetch("/api/posts");
      const posts = await postRes.json();

      setPosts(posts);
    }

    fetchPosts();
  }, [numPosts]);

  const handleLike = async (postId, likes) => {
    if (!username) {
      router.push({
        pathname: "/login",
      });
      return;
    }

    const hasLiked = likes.includes(username);

    const updatedLikes = hasLiked
      ? likes.filter((like) => like !== username)
      : [...likes, username];

    const updatedPosts = posts.map((post) =>
      post._id === postId ? { ...post, likes: updatedLikes } : post
    );

    setPosts(updatedPosts);

    const response = await fetch(`/api/like/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        username,
        likes: updatedLikes,
      }),
    });

    if (response.ok) {
      setNumPosts(numPosts + 1);
    } else {
      console.error("Failed to update likes");
    }
  };

  const handleLogin = async () => {
    router.push({
      pathname: "/login",
    });
  };

  const handleSignUp = async () => {
    router.push({
      pathname: "/signup",
    });
  };

  return (
    <>
      {!user && (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="col-md-6">
            <p className="display-1">
              Create an account to interact with users 😭🤷‍♂️
            </p>
            <div className="d-flex align-items-center gap-3 text-dm">
              <Grid>
                <Button color="secondary" auto flat onPress={handleSignUp}>
                  Register
                </Button>
              </Grid>
              <Grid>
                <Button color="secondary" auto flat onPress={handleLogin}>
                  Login
                </Button>
              </Grid>
            </div>
          </div>
        </div>
      )}
      <div className="row d-flex justify-content-between">
        {user && (
          <div className="col-md-8 mt-5 mt-lg-4">
            <CreatePost
              name={user?.name?.split(" ")[0]}
              setNumPosts={setNumPosts}
              username={username}
              numPosts={numPosts + 1}
            />
            <div class="card rounded-5 mt-5 mb-3 border-dark bg-grey d-lg-none">
              <div class="card-body shadow text-dm">
                <Popover>
                  <Popover.Trigger>
                    <User
                      as="button"
                      text={user.name}
                      name={user.name}
                      description={user.username}
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
                        text={user.name}
                        name={user.name}
                        description={user.username}
                        css={{ px: 0 }}
                        className="pb-2"
                      />

                      <Grid.Container>
                        <Grid xs={12}>
                          <Text
                            className="user-twitter-card__text"
                            size={14}
                            css={{ mt: "$1" }}
                            color="#888888"
                          >
                            Full-stack developer, @getnextui lover she/her 🎉
                          </Text>
                        </Grid>
                      </Grid.Container>

                      <Grid.Container className="d-flex align-items-center justify-content-between">
                        <Text
                          className="user-twitter-card__text"
                          size={14}
                          color="#888888"
                        >
                          <Text
                            b
                            color="foreground"
                            className="user-twitter-card__text"
                            size={14}
                          >
                            {userData?.followers?.length}{" "}
                          </Text>
                          Followers
                        </Text>

                        <Text color="#888888" size={14}>
                          |
                        </Text>

                        <Text
                          className="user-twitter-card__text"
                          size={14}
                          color="#888888"
                        >
                          <Text
                            b
                            color="foreground"
                            className="user-twitter-card__text"
                            size={14}
                          >
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
            {posts.map((post, index) => (
              <Post
                key={index}
                index={index}
                name={post.author}
                username={post.username}
                text={post.text}
                id={post._id}
                likes={post.likes}
                handleLike={handleLike}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        )}
        <div className="col-md-4">
          <div className="position-sticky" style={{ top: "8rem" }}>
            {user && <Suggested username={user.username} />}
          </div>
        </div>
      </div>
      {user ? (
        <CreatePostModal
          name={user?.name?.split(" ")[0]}
          setNumPosts={setNumPosts}
          username={username}
          numPosts={numPosts + 1}
        />
      ) : (
        <>kaka</>
      )}
    </>
  );
}
