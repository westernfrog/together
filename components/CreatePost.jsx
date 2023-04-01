import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetUserName } from "./GetUserName";

export default function CreatePost(props) {
  const userData = GetUserName();
  const router = useRouter();
  const [text, setText] = useState("");

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
      <div className="border-bottom border-dark">
        <div className="my-4 py-3">
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
            <textarea
              className="form-control rounded-4 border-0 shadow text-white text-dm bg-grey"
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
    </>
  );
}
