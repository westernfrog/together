import { Button, Checkbox, Text, Row } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp(params) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");

  var emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  var paswdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$/;

  const handleChange = async (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "username") {
      setUserName(e.target.value);
    }
  };
  const handleSubmit = async () => {
    if (name.length > 3) {
      setEmailError(false);
      if (email.match(emailRegex)) {
        setEmailError(false);
        if (password.match(paswdRegex)) {
          setPasswordError(false);

          const data = { name, username, email, password };
          const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          let response = await res.json();
          console.log(data);
          setName("");
          setEmail("");
          setPassword("");
          setUserName("");

          if (response.success) {
            console.log("Success");

            router.push({
              pathname: "/login",
            });
          } else {
            console.log(response.error);
            setError(response.error);
          }
        } else {
          setPasswordError(true);
          setEmailError(false);
          setNameError(false);
        }
      } else {
        setEmailError(true);
        setPasswordError(false);
        setNameError(false);
      }
    } else {
      setNameError(true);
      setEmailError(false);
      setPasswordError(false);
    }
  };

  return (
    <>
      <main className="col-md-4 mx-auto">
        <div className="d-flex align-items-center justify-content-between">
          <form className="my-5 py-5 w-100">
            <h1 className="display-3 mb-3 lh-1 text-shadow-3">
              Lets Have A Chat!
            </h1>
            <div className="form-floating text-dm">
              <input
                type="text"
                className="form-control rounded-4 text-white border border-dark bg-transparent"
                id="floatingName"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
                required
                style={{ boxShadow: "none" }}
              />
              <label htmlFor="floatingPassword">Your Name</label>
              <div
                className={`${
                  nameError ? "d-grid" : "d-none"
                } fs-8 text-warning ms-1`}
              >
                Enter your name!
              </div>
            </div>

            <div className="form-floating text-dm my-2">
              <input
                type="text"
                className="form-control rounded-4 text-white border border-dark bg-transparent"
                id="floatinguserName"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                required
                style={{ boxShadow: "none" }}
              />
              <label htmlFor="floatingPassword">Your Username</label>
              <div
                className={`${
                  nameError ? "d-grid" : "d-none"
                } fs-8 text-warning ms-1`}
              >
                Enter your name!
              </div>
            </div>

            <div className="form-floating text-dm">
              <input
                type="email"
                className="form-control rounded-4 text-white border border-dark bg-transparent"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={handleChange}
                required
                style={{ boxShadow: "none" }}
              />
              <label htmlFor="floatingInput">Email address</label>
              <div
                className={`${
                  emailError ? "d-grid" : "d-none"
                } fs-8 text-warning ms-1`}
              >
                Please enter a valid email address.
              </div>
            </div>

            <div className="form-floating text-dm my-2">
              <input
                type="password"
                className="form-control rounded-4 text-white border border-dark bg-transparent"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
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
                    href={"/login"}
                    className="text-decoration-none link-light"
                  >
                    Already have an account?
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
              Register
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
