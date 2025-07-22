import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useUser } from "../../context/UserContext";
import Spinner from "../../components/Spinner/Spinner";

function Login() {
  const [email, setEmail] = useState("piggy@gmail.com");
  const [password, setPassword] = useState("Abc!123Abc");

  const { login, isSnackbar, snackbarText, isLoader, currentUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  return (
    <main className="login">
      {isLoader ? (
        <Spinner />
      ) : (
        <div className="formWarper">
          <form className="form" onSubmit={handleSubmit}>
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
                <span>Sign out</span>
             </div>
            </p>
          </div>
        </div>
      )}

      {isSnackbar && <div className="snackbar">{snackbarText}</div>}
    </main>
  );
}

export default Login;
