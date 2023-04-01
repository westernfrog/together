import { Button, User } from "@nextui-org/react";
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
    const { value } = commentValue;

    if (value.trim() === "") {
      return;
    }

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

  return (
    <>
      <div class="card my-5 bg-grey rounded-4" key={props.key}>
        <div class="card-body p-3 p-lg-4">
          <h5 class="card-title d-flex align-items-center justify-content-between">
            <User
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              name={props.name}
              description={props.username}
              className="ps-0"
            />

            <Button
              auto
              light
              size={"lg"}
              className="px-0"
              color={"secondary"}
              onPress={() => {
                props.handleLike(props.id, props.likes);
                handleRefresh();
              }}
            >
              <i
                class={`fa-solid fa-heart fa-lg ${
                  props.likes.includes(username) ? "text-danger" : "text-white"
                }`}
              ></i>
              <span className="ms-3 text-dm fw-bold text-white">
                {props.likes.length}
              </span>
            </Button>
          </h5>

          <p class="card-text">{props.text}</p>
          <p className="card-text text-muted fs-8">at 3:17 PM March 31, 2023</p>
        </div>
        <div className="card-footer p-3 p-lg-4">
          <p>Comments 📭</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommentSubmit(props.id);
              handleRefresh();
            }}
            className="d-flex align-items-center gap-3 mb-3 w-100"
          >
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-grey rounded-4 text-dm text-white"
                placeholder="Comment here.."
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={
                  commentValues.find(
                    (commentValue) => commentValue.postId === props.id
                  )?.value ?? ""
                }
                onChange={(e) => handleCommentChange(props.id, e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
            <Button auto flat type="submit" onPress={handleRefresh}>
              📫
            </Button>
          </form>
          {postComments[props.id] &&
            postComments[props.id].map((comment) =>
              comment.comments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((c) => (
                  <div
                    class="card bg-grey rounded-5 border-dark mb-4 shadow-sm"
                    key={c._id}
                  >
                    <div class="card-body">
                      <h6 class="card-title">
                        <User
                          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                          name={c.author}
                          description={c.username}
                          size="sm"
                          className="ps-0"
                        />
                      </h6>
                      <p class="card-text fs-7">{c.comment}</p>
                      <p className="card-text text-muted fs-8">
                        at {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
            )}
        </div>
      </div>
    </>
  );
}
