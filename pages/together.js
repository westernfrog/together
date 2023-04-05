import { GetUserName } from "@/components/GetUserName";
import CreatePost from "@/components/CreatePost";
import Suggested from "@/components/Suggested";
import { Button, Grid, User, Popover, Spacer, Text } from "@nextui-org/react";
import Post from "@/components/Post";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CreatePostModal from "@/components/CreatePostModal";
import Profile from "@/components/Profile";

export default function Together() {
  const router = useRouter();
  const user = GetUserName();
  const [posts, setPosts] = useState([]);
  const [numPosts, setNumPosts] = useState(0);

  const username = user.username;

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

            <Profile />

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
      {user && (
        <CreatePostModal
          name={user?.name?.split(" ")[0]}
          setNumPosts={setNumPosts}
          username={username}
          numPosts={numPosts + 1}
        />
      )}
    </>
  );
}
