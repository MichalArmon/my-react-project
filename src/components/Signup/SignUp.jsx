import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import "../Pages/Login/Login.css";
import styles from "./SignUp.module.css";
import { useUser } from "../../context/UserContext";
function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "Abc!123Abc",
    firstName: "",
    lastName: "",
    phone: "",
    imageUrl: "",
    imageAlt: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const { createNewUser } = useUser();

  const [snackbarText, setSnackbarText] = useState("");
  const [isSnackbar, setIsSnackbar] = useState(false);

  const snackbar = (text) => {
    setSnackbarText(text);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 2000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createNewUser(form);
      snackbar("נרשמת בהצלחה!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      snackbar(err.message);
    }
  };

  return (
    <main className={styles.signupForm}>
      <form className={styles.form} onSubmit={handleSignUp}>
        <div className={styles.formGrid}>
          <div className={styles.row}>
            <label>First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.row}>
            <label>Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.row}>
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>Image URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>Image Alt</label>
            <input
              name="imageAlt"
              value={form.imageAlt}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.row}>
            <label>Street</label>
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>House Number</label>
            <input
              name="houseNumber"
              value={form.houseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>ZIP Code</label>
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.btnCreate}>
          Create Account
        </button>
      </form>

      {isSnackbar && <div className="snackbar">{snackbarText}</div>}
    </main>
  );
}

export default SignUp;
