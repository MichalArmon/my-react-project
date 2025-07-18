import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login/Login.css";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    const newUser = {
      email: form.email,
      password: form.password,
      name: {
        first: form.firstName,
        middle: "",
        last: form.lastName,
      },
      phone: form.phone,
      image: {
        url: form.imageUrl,
        alt: form.imageAlt,
      },
      address: {
        state: "IL",
        country: "Israel",
        city: form.city,
        street: form.street,
        houseNumber: +form.houseNumber,
        zip: +form.zip,
      },
      isBusiness: true,
    };

    try {
      const res = await fetch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        snackbar(err);
        return;
      }

      const user = await res.json();
      snackbar("נרשמת בהצלחה!");

      // אופציונלי: מעבר למסך התחברות
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err) {
      snackbar("שגיאה בהרשמה לשרת");
    }
  };

  return (
    <main className="signin">
      <form className="form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>

        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>First Name</label>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />

        <label>Image Alt</label>
        <input
          name="imageAlt"
          value={form.imageAlt}
          onChange={handleChange}
          required
        />

        <label>City</label>
        <input name="city" value={form.city} onChange={handleChange} required />

        <label>Street</label>
        <input
          name="street"
          value={form.street}
          onChange={handleChange}
          required
        />

        <label>House Number</label>
        <input
          name="houseNumber"
          value={form.houseNumber}
          onChange={handleChange}
          required
        />

        <label>ZIP Code</label>
        <input name="zip" value={form.zip} onChange={handleChange} required />

        <button type="submit">Create Account</button>
      </form>

      {isSnackbar && <div className="snackbar">{snackbarText}</div>}
    </main>
  );
}

export default SignUp;
