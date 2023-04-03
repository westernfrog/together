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
        class="modal fade d-lg-none"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-dm rounded-5 border-dark bg-grey">
            <div class="modal-header border-0">
              <p class="modal-title" id="staticBackdropLabel">
                Share your thoughts here!
              </p>
              <button type="button" class="btn px-0" data-bs-dismiss="modal">
                <i className="fa-solid fa-xmark text-white"></i>
              </button>
            </div>
            <div class="modal-body">
              <div className="mb-5">
                <h2 className="text-dm fw-bold text-shadow-3">
                  Hello, {props.name} 😍
                </h2>
                <div className="mt-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label text-dm fs-6"
                  >
                    Share your thoughts or ask for any answers!
                  </label>
                  <textarea
                    className="form-control rounded-4 border-purple shadow text-white text-dm bg-grey"
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
