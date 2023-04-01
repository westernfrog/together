import { Button, Checkbox, Text, Row } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");

  var paswdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$/;

  const handleChange = async (e) => {
    if (e.target.name == "username") {
      setUserName(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async () => {
    if (username.length > 0) {
      setUserNameError(false);
      if (password.match(paswdRegex)) {
        setPasswordError(false);

        const data = { username, password };
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let response = await res.json();

        setUserName("");
        setPassword("");

        if (response.success) {
          localStorage.setItem("token", response.token);
          console.log("Success");

          router.push({
            pathname: "/together",
          });
        } else {
          console.log(response.error);
          setError(response.error);
        }
      } else {
        setPasswordError(true);
        setUserNameError(false);
        setError("");
      }
    } else {
      setUserNameError(true);
      setPasswordError(false);
      setError("");
    }
  };
  return (
    <>
      <main className="col-md-4 mt-5 mx-auto">
        <div className="d-flex align-items-center justify-content-between">
          <form className="my-5 py-5 text-white w-100">
            <h1 className="display-3 mb-3 lh-1 text-shadow-3">Welcome Back!</h1>
            <h1 className="h4 mb-3 text-shadow-3">Please sign in</h1>

            <div className="form-floating text-dm">
              <input
                type="text"
                className="form-control rounded-4 border border-dark bg-transparent text-white"
                id="floatingInput"
                placeholder="name@example.com"
                name="username"
                value={username}
                onChange={handleChange}
                required
                style={{ boxShadow: "none" }}
              />
              <label htmlFor="floatingInput">Your Username</label>
              <div
                className={`${
                  usernameError ? "d-grid" : "d-none"
                } fs-8 text-warning ms-1`}
              >
                Please enter a valid Username.
              </div>
            </div>
            <div className="form-floating mt-2 text-dm">
              <input
                type="password"
                className="form-control rounded-4 border border-dark bg-transparent text-white"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                autoComplete="off"
                required
                style={{ boxShadow: "none" }}
              />
              <label htmlFor="floatingPassword">Password</label>
              <div
                className={`${
                  passwordError ? "d-grid" : "d-none"
                } fs-8 text-warning ms-1`}
              >
                Your password should be between 5 to 15 characters and must
                include at least one numeric digit and a special character.
              </div>
            </div>

            <div className="my-2">
              <Row justify="space-between">
                <Checkbox color="secondary">
                  <Text size={14} className="mb-0">
                    Remember me
                  </Text>
                </Checkbox>
                <Text size={14}>
                  <Link
                    href={"/signup"}
                    className="text-decoration-none text-white"
                  >
                    Create an account!
                  </Link>
                </Text>
              </Row>
            </div>
            <p className="text-danger text-center fs-7">{error}</p>
            <Button
              shadow
              color="secondary"
              auto
              className="w-100 text-dm"
              onPress={handleSubmit}
            >
              Login
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
