import { Button, User, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GetUserName } from "./GetUserName";

export default function Post(props) {
  const userData = GetUserName();
  const [posts, setPosts] = useState([]);
  const [numPosts, setNumPosts] = useState(0);
  const [postComments, setPostComments] = useState({});
  const [commentValues, setCommentValues] = useState([]);

  const username = userData.username;

  const hasComments = posts.map((post) => post.comments.length > 0);

  useEffect(() => {
    async function fetchPosts() {
      const postRes = await fetch("/api/posts");
      const posts = await postRes.json();

      const commentRes = await fetch("/api/comments");
      const comments = await commentRes.json();
      const postComments = {};
      posts.forEach((post) => {
        postComments[post._id] = comments.filter(
          (comment) => comment._id === post._id
        );
      });

      setPosts(posts);
      setPostComments(postComments);
    }

    fetchPosts();
  }, [numPosts]);

  useEffect(() => {
    setCommentValues(posts.map((post) => ({ postId: post._id, value: "" })));
  }, [posts]);

  const handleCommentChange = (postId, value) => {
    setCommentValues((commentValues) =>
      commentValues.map((commentValue) =>
        commentValue.postId === postId
          ? { ...commentValue, value }
          : commentValue
      )
    );
  };

  const handleCommentSubmit = async (postId) => {
    const commentValue = commentValues.find(
      (commentValue) => commentValue.postId === postId
    );
    if (commentValue.length > 0) {
      return commentValue;
    } else if (commentValue.length === 0) {
      return;
    }
    const { value } = commentValue;

    const response = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: value,
        username: userData.username,
        name: userData.name,
        postId,
      }),
    });

    if (response.ok) {
      setNumPosts(numPosts + 1);
      const comment = await response.json();
      const commentsForPost = postComments[postId] || [];
      setPostComments({
        ...postComments,
        [postId]: [...commentsForPost, comment],
      });

      const updatedCommentValues = commentValues.map((commentValue) =>
        commentValue.postId === postId
          ? { ...commentValue, value: "" }
          : commentValue
      );
      setCommentValues(updatedCommentValues);
    } else {
      console.error("Failed to create comment");
    }
  };

  const handleRefresh = async (e) => {
    setNumPosts(numPosts + 2);
  };

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <>
      {posts ? (
        <div
          className="card bg-grey rounded-4 mb-5 mt-0 mt-lg-5"
          key={props.index}
        >
          <div className="card-body px-3 px-lg-4">
            <h5 className="card-title d-flex align-items-center justify-content-between">
              <User
                text={props.name}
                name={props.name}
                description={props.username}
                className="ps-0"
              />

              <div className="">
                <Button
                  auto
                  light
                  rounded
                  size={"lg"}
                  className="px-1"
                  onPress={() => {
                    props.handleLike(props.id, props.likes);
                    handleRefresh();
                  }}
                >
                  <i
                    className={`fa-solid fa-heart ${
                      props.likes.includes(username)
                        ? "text-danger"
                        : "text-white"
                    }`}
                  ></i>
                </Button>
                <div className="text-dm fw-bold text-white fs-8 text-center">
                  {props.likes.length}
                </div>
              </div>
            </h5>

            <p className="card-text">{props.text}</p>
            <p className="card-text text-muted fs-8">
              on{" "}
              {new Date(props.createdAt).toLocaleDateString("en-US", options)}
            </p>
          </div>
          <div className="card-footer p-3 p-lg-4 my-3">
            <div className="d-flex align-items-center justify-content-between">
              <p>Comments 📭</p>
              {hasComments[props.index] ? (
                <Button
                  auto
                  flat
                  color={"secondary"}
                  size={"xs"}
                  className="text-dm mb-3"
                  data-bs-toggle="collapse"
                  data-bs-target={`#comments-${props.id}`}
                >
                  View comments
                </Button>
              ) : (
                <Button auto flat disabled size={"xs"} className="text-dm mb-3">
                  No comments yet
                </Button>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit(props.id);
                handleRefresh();
              }}
              className="d-flex align-items-center gap-3 w-100"
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-grey rounded-4 text-dm text-white"
                  placeholder="Comment here.."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={
                    commentValues.find(
                      (commentValue) => commentValue.postId === props.id
                    )?.value ?? ""
                  }
                  onChange={(e) =>
                    handleCommentChange(props.id, e.target.value)
                  }
                  style={{ boxShadow: "none" }}
                />
              </div>
              <Button auto flat type="submit" onPress={handleRefresh}>
                📫
              </Button>
            </form>

            <div className="collapse" id={`comments-${props.id}`}>
              {postComments[props.id]?.map((comment) =>
                comment.comments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((c) => (
                    <div
                      className="card bg-dark rounded-5 border-dark mt-4 shadow"
                      key={c._id}
                    >
                      <div className="card-body text-dm">
                        <User
                          size={"sm"}
                          color={"gradient"}
                          name={c.author}
                          description={c.username}
                          className="ps-0"
                        />
                        <p className="card-text fs-7 my-3">{c.comment}</p>
                        <p className="card-text text-muted fs-8">
                          on{" "}
                          {new Date(c.createdAt).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading type="points-opacity" color="currentColor" size="lg" />
      )}
    </>
  );
}
