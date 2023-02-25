import Image from "next/image";
import ButtonArea from "./ButtonArea";

export default function OverviewMd(params) {
  return (
    <>
      <div className="container my-4 d-lg-none">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <h4>Hello, Pyaaru! 😍</h4>
              <p className="fs-7 text-muted">What&apos;s bothering you?</p>
            </div>
            <div className="col-lg-6 me-auto">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-2 col-lg-1">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/774/774122.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
                <div className="col-10">
                  <div className="input-group">
                    <textarea
                      className="form-control rounded-4 text-dm bg-grey border-0 fs-7 text-light p-2 text-center shadow-sm"
                      aria-label="With textarea"
                      placeholder="Share anything you want."
                      rows={2}
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ButtonArea />
        </div>
      </div>
    </>
  );
}
