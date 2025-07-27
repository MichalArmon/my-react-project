import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { useUser } from "../../context/UserContext";
import Spinner from "../../components/Spinner/Spinner";

function Login() {
  const [email, setEmail] = useState("mnewuser@example.com");
  const [password, setPassword] = useState("Abc!123Abc");
  const navigate = useNavigate();

  const {
    isSnackbar,
    snackbarText,
    isLoader,
    getUser,
    setUser,
    decodeToken,
    logout,

    setIsLoader,
  } = useUser();

  async function login(e) {
    e.preventDefault();
    setIsLoader(true);

    try {
      const res = await fetch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.text();
      localStorage.setItem("token", data);
      const decoded = await decodeToken(data);
      localStorage.setItem("userID", decoded._id);
      setUser(true);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      const userFromServer = await getUser(decoded._id);
      console.log("🔥 userFromServer:", userFromServer);
      setUser(userFromServer);
      localStorage.setItem("userID", decoded._id);

      navigate("/");
      setTimeout(() => {
        setIsLoader(false);
      }, 500);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <main className="login">
      {isLoader && <Spinner />}
      <div className="formWarper">
        <form className="form" onSubmit={login}>
          <div className="row">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit" className="btnLogin">
            Login
          </button>
        </form>

        <div>
          <p>
            Need an Account?
            <br />
            <div className="actions">
              <span className="line">
                <Link to="/signup">Sign Up</Link>
                <br />
              </span>
              <span className="logout" onClick={() => logout()}>
                Sign out
              </span>
            </div>
          </p>
        </div>
      </div>

      {isSnackbar && <div className="snackbar">{snackbarText}</div>}
    </main>
  );
}

export default Login;
