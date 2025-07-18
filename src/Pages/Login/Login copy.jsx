import { useState } from "react";
import "./Login.css";
import { usePosts } from "../../context/PostContext";

function Login() {
  const [user, setUser] = useState();
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoader } = usePosts();

  const snackbar = (text) => {
    setSnackbarText(text);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 2000);
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoader(true);

    const form = { email, password };

    try {
      const res = await fetch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // <-- תוקן
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        const user = await res.json();
        snackbar(`${user.fullName} התחבר בהצלחה`);
        setUser(user);
      } else {
        const err = await res.text();
        snackbar(err);
      }
    } catch (err) {
      snackbar("שגיאה בחיבור לשרת");
    }

    setIsLoader(false);
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
          />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
