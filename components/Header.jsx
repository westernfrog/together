import Link from "next/link";
import { Dropdown, Text } from "@nextui-org/react";

export default function Header(props) {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark py-2 border-bottom border-dark sticky-top"
        style={{ backgroundColor: "#111" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 text-dancing" href="/together">
            Together
          </Link>
          <div>
            <Link href="/feed">
              <button
                className="navbar-toggler me-1 py-2 rounded-4 shadow-sm btn-shrink"
                type="button"
              >
                <i className="fa-solid fa-fire fa-sm"></i>
              </button>
            </Link>
            <button
              className="navbar-toggler ms-1 py-2 rounded-4 shadow-sm btn-shrink"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-burger fa-sm"></i>
            </button>
          </div>

          <div
            className="collapse navbar-collapse mt-2 mt-lg-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto d-flex align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="">
                  <div className="row">
                    <div className="col-2 me-0 me-lg-3">🏡</div>
                    <div className="col">Home</div>
                  </div>
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-5">
                <Link className="nav-link" href="/explore">
                  <div className="row">
                    <div className="col-2 me-0 me-lg-3">🚗</div>
                    <div className="col">Explore</div>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/search"}>
                  <div className="row">
                    <div className="col-2 me-0 me-lg-3">🔍</div>
                    <div className="col">Search</div>
                  </div>
                </Link>
              </li>
              <li className="nav-item dropdown ms-0 ms-lg-5">
                <Dropdown placement="bottom-right">
                  <Dropdown.Trigger>
                    <span className="nav-link dropdown-toggle pt-1 pt-lg-3 d-flex align-items-center">
                      <div className="row">
                        <div className="col-2 me-4 me-lg-3">😃</div>
                        <div className="col">Profile</div>
                      </div>
                    </span>
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                    color="secondary"
                    aria-label="User Actions"
                    className="text-dm"
                  >
                    <Dropdown.Item
                      key="profile"
                      css={{ height: "$18" }}
                      textValue=""
                    >
                      <Text b color="inherit" css={{ d: "flex" }}>
                        Signed in as
                      </Text>
                      <Text b color="inherit" css={{ d: "flex" }}>
                        {props.email}...
                      </Text>
                    </Dropdown.Item>
                    <Dropdown.Item key="settings" withDivider>
                      <Link
                        href={"/profile"}
                        className="text-decoration-none"
                        style={{ color: "inherit" }}
                      >
                        My Account
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item key="team_settings">
                      <Link
                        href={"/about"}
                        className="text-decoration-none"
                        style={{ color: "inherit" }}
                      >
                        About <span className="text-dancing">Together</span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="logout"
                      color="error"
                      withDivider
                      textValue=""
                    >
                      <span onClick={props.logout}>Log Out</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}