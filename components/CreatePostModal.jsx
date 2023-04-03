import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetUserName } from "./GetUserName";

export default function CreatePostModal(props) {
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
      <div className="fixed-bottom d-flex align-items-center justify-content-end mb-4 me-4 d-lg-none">
        <Button
          auto
          flat
          color={"secondary"}
          size={"md"}
          className="shadow"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <span className="fa-beat fa-bounce">✏️</span>
        </Button>
      </div>

      <div
        className="modal fade d-lg-none"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-dm rounded-5 border-dark bg-grey">
            <div className="modal-header border-0">
              <h4
                className="modal-title text-dm text-shadow-3"
                id="staticBackdropLabel"
              >
                Hello, {props.name} 😍
              </h4>
              <button
                type="button"
                className="btn px-0"
                data-bs-dismiss="modal"
              >
                <i className="fa-solid fa-xmark text-light"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-5">
                <div className="">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label text-dm fs-6"
                  >
                    Share your thoughts or ask for any answers!
                  </label>
                  <textarea
                    className="form-control rounded-4 border-purple shadow text-light text-dm bg-grey"
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
                    data-bs-dismiss="modal"
                  >
                    Post! 📩
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
