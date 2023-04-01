import { Button, User } from "@nextui-org/react";

export default function Post(props) {
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
            <i class="fa-solid fa-heart"></i>
          </h5>

          <p class="card-text">{props.text}</p>
          <p className="card-text text-muted fs-8">at 3:17 PM March 31, 2023</p>
        </div>
        <div className="card-footer p-3 p-lg-4">
          <p>Comments 📭</p>
          <div className="d-flex align-items-center gap-3 mb-3">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-grey rounded-4 text-dm text-white"
                placeholder="Comment here.."
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ boxShadow: "none" }}
              />
            </div>
            <Button auto flat>
              📫
            </Button>
          </div>
          <div class="card bg-grey rounded-5 border-dark mb-4 shadow-sm">
            <div class="card-body">
              <h6 class="card-title">
                <User
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  name="Ariana Wattson"
                  description="UI/UX Designer @Github"
                  size="sm"
                  className="ps-0"
                />
              </h6>
              <p class="card-text fs-7">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <p className="card-text text-muted fs-8">
                at 3:17 PM March 31, 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
