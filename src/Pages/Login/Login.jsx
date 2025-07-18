import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { usePosts } from "../../context/PostContext";
import React from "react";

function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("Abc!123Abc");
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const { setIsLoader } = usePosts();
  const navigate = useNavigate();

  const snackbar = (text) => {
    setSnackbarText(text);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 2000);
  };

  const login = async (e) => {
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

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Email or password incorrect");

      localStorage.setItem("token", data.token);
      snackbar("התחברת בהצלחה 🎉");

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      snackbar("שגיאה: " + err.message);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <main className="login">
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
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      {isSnackbar && <div className="snackbar">{snackbarText}</div>}
    </main>
  );
}

export default Login;
