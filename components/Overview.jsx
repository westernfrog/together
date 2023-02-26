import Image from "next/image";
import Sidebar from "./Sidebar";
import UserTag from "./UserTag";

export default function Overview(params) {
  return (
    <>
      <div className="container my-4 d-lg-block d-none">
        <div className="container-fluid">
          <div className="row sticky-top gap-4">
            <div className="col-3">
              <UserTag />
              <Sidebar />
            </div>
            <div className="col-6">
              <div className="mb-3 py-2 px-3 rounded">
                <div className="row d-flex align-items-center justify-content-center gap-1">
                  <div className="col-2 col-lg-1 me-2">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/774/774122.png"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="col-8 col-lg-9 text-dm d-flex align-items-center">
                    <div className="input-group">
                      <textarea
                        className="form-control rounded-4 bg-grey fs-7 p-2 text-center shadow-sm text-light"
                        aria-label="With textarea"
                        placeholder="Share anything you want."
                        rows={2}
                        style={{ resize: "none" }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-2 col-lg-1 ps-0">
                    <button className="btn bg-grey btn-sm btn-shrink rounded py-3 px-4 text-light">
                      <i class="fa-regular fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-auto" style={{ maxHeight: "60vh" }}>
                <div className="bg-grey rounded py-5 mb-3 mx-4">hwdwkiwjkk</div>
                <div className="bg-grey rounded py-5 mb-3 mx-4">hwdwkiwjkk</div>
                <div className="bg-grey rounded py-5 mb-3 mx-4">hwdwkiwjkk</div>
                <div className="bg-grey rounded py-5 mb-3 mx-4">hwdwkiwjkk</div>
                <div className="bg-grey rounded py-5 mb-3 mx-4">hwdwkiwjkk</div>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
