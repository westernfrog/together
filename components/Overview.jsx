import { Button, Grid } from "@nextui-org/react";
import Link from "next/link";

export default function Overview(params) {
  return (
    <>
      <div className="row">
        <div
          className="col-md-6 position-absolute"
          style={{ zIndex: "1000", top: "40%" }}
        >
          <div>
            <h1 className="display-1 text-shadow-3">Welcome to Together</h1>
            <p>
              A social media platform to share thoughts and content, with a
              global chat feature.
            </p>
            <div className="d-flex gap-3 text-dm">
              <Grid>
                <Button color="secondary" auto flat>
                  <Link
                    href={"/signup"}
                    className="text-decoration-none shadow"
                    style={{ color: "inherit" }}
                  >
                    Register
                  </Link>
                </Button>
              </Grid>

              <Grid>
                <Button color="secondary" auto flat>
                  <Link
                    href={"/login"}
                    className="text-decoration-none shadow"
                    style={{ color: "inherit" }}
                  >
                    Login
                  </Link>
                </Button>
              </Grid>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-grid align-items-center justify-content-center">
          <svg width="500" height="500" viewBox="0 0 500 500">
            <path>
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="M431.3 121.9c22 40.1 11.3 97.5 13.3 146.9 2 49.5 16.6 91.1 4.3 121.8-12.2 30.6-51.3 50.4-88.5 55.1-37.1 4.7-72.4-5.7-108.8-17.1-36.5-11.3-74.1-23.7-104-52-29.9-28.2-52-72.4-48.4-115.4 3.5-43 32.7-84.8 70.5-122.2 37.7-37.3 84-70.2 134.5-75.1 50.4-5 105.1 17.9 127.1 58z;
					
									M404.4 176.7c20.9 16.4 20.8 58.8 38.8 106.2 18.1 47.4 54.4 99.7 40.9 123.6-13.5 23.9-76.7 19.3-131.6 40.4-54.8 21-101.2 67.7-150.5 71.7-49.4 4.1-101.7-34.5-107.8-81.9C88 389.2 128 333 144.2 278c16.2-55.1 8.5-108.8 30.5-125 22-16.1 73.7 5.5 120.4 11.3 46.7 5.9 88.5-3.9 109.3 12.4z;
                  
                  M431.3 121.9c22 40.1 11.3 97.5 13.3 146.9 2 49.5 16.6 91.1 4.3 121.8-12.2 30.6-51.3 50.4-88.5 55.1-37.1 4.7-72.4-5.7-108.8-17.1-36.5-11.3-74.1-23.7-104-52-29.9-28.2-52-72.4-48.4-115.4 3.5-43 32.7-84.8 70.5-122.2 37.7-37.3 84-70.2 134.5-75.1 50.4-5 105.1 17.9 127.1 58z;"
              />
            </path>
          </svg>
        </div>
      </div>
    </>
  );
}
