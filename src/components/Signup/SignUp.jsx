import { useNavigate } from "react-router-dom";

// import "../Pages/Login/Login.css";
import styles from "./SignUp.module.css";
import { useUser } from "../../context/UserContext";
import Input from "../../ui/form/Input";
import signupSchema from "../../helpers/signupSchema";
import { useState } from "react";
import FormBtn from "../../ui/form/formBtn";
function SignUp() {
  const navigate = useNavigate();
  useState;
  const [form, setForm] = useState({
    email: "",
    password: "Abc!123Abc",
    name: {
      first: "Michal",
      middle: "",
      last: "",
    },
    phone: "",
    image: {
      url: "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      alt: "",
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    isBusiness: true,
  });

  const { createNewUser, snackbar, isSnackbar, snackbarText } = useUser();

  // const [snackbarText, setSnackbarText] = useState("");
  // const [isSnackbar, setIsSnackbar] = useState(false);

  // const snackbar = (text) => {
  //   setSnackbarText(text);
  //   setIsSnackbar(true);
  //   setTimeout(() => setIsSnackbar(false), 2000);
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // name יכול להיות "name.first" או "address.city"
    const keys = name.split(".");
    setForm((prev) => {
      const draft = structuredClone(prev);
      let cur = draft;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys.at(-1)] = type === "checkbox" ? checked : value;
      return draft;
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createNewUser(form);
      snackbar("Signed up successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      snackbar(err.message);
    }
  };

  return (
    <main className={styles.signupForm}>
      <h1 className="uppercase  text-stone-900 text-center mb-3 text-2xl md:text-[24px]">
        sign up
      </h1>
      <form onSubmit={handleSignUp}>
        <div className={styles.formGrid}>
          <Input
            placeholder="First Name"
            name="name.first"
            value={form.name.first}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="Last Name"
            name="name.last"
            value={form.name.last}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="Image URL"
            name="image.url"
            value={form.image.url}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="Image Alt"
            name="image.alt"
            value={form.image.alt}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="City"
            name="address.city"
            value={form.address.city}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="Street"
            name="address.street"
            value={form.address.street}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="House Number"
            name="address.houseNumber"
            value={form.address.houseNumber}
            onChange={handleChange}
            required
          />

          <Input
            placeholder="ZIP Code"
            name="address.zip"
            value={form.address.zip}
            onChange={handleChange}
            required
          />
          <input
            type="checkbox"
            name="isBusiness"
            checked={form.isBusiness}
            onChange={handleChange}
            className="h-4 w-4 accent-amber-500"
          />
        </div>
        <FormBtn type="submit">Create Account</FormBtn>
      </form>

      {isSnackbar && <div className="snackbar">{snackbarText}</div>}
    </main>
  );
}

export default SignUp;
