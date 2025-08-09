import { useEffect, useState } from "react";
import styles from "./UpdateUser.module.css";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { getUser, updateUser } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  useEffect(() => {
    async function getUserHere() {
      try {
        const user = await getUser(id);
        setForm(user);
        console.log(user);
      } catch (err) {
        console.error("", err);
      }
    }

    getUserHere();
  }, [id]);

  const [snackbarText, setSnackbarText] = useState("");
  const [isSnackbar, setIsSnackbar] = useState(false);

  const snackbar = (text) => {
    setSnackbarText(text);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 2000);
  };

  function handleChange(e) {
    const { name, value } = e.target;

    const keys = name.split(".");

    if (keys.length === 1) {
      // שדה רגיל
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      // שדה מקונן כמו image.url או address.city
      setForm((prev) => {
        const newForm = { ...prev };
        let nested = newForm;

        // נווט עד השדה האחרון
        for (let i = 0; i < keys.length - 1; i++) {
          nested[keys[i]] = { ...nested[keys[i]] }; // שמירה על אימיוטביליות
          nested = nested[keys[i]];
        }

        nested[keys[keys.length - 1]] = value;

        return newForm;
      });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      email: form.email,
      password: form.password,
      phone: form.phone,
      name: {
        first: form.name.first,
        middle: form.name.middle || "",
        last: form.name.last,
      },
      image: {
        url: form.image.url,
        alt: form.image.alt,
      },
      address: {
        state: form.address.state || "IL",
        country: form.address.country || "Israel",
        city: form.address.city,
        street: form.address.street,
        houseNumber: Number(form.address.houseNumber),
        zip: Number(form.address.zip),
      },
      isBusiness: form.isBusiness ?? true, //
    };

    try {
      const token = localStorage.getItem("token");
      const updatedUser = await updateUser(token, id, userData);

      console.log("updateduser:", updatedUser);

      navigate("/");

      alert("user updated successfully!");
      console.log("🆔 useParams id:", id);
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  }
  if (!form) return <p>Loading card...</p>;

  return (
    <main className={styles.signupForm}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.row}>
            <label>First Name</label>
            <input
              name="name.first"
              value={form.name.first}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>Middle Name</label>
            <input
              name="name.middle"
              value={form.name.middle}
              onChange={handleChange}
            />
          </div>

          <div className={styles.row}>
            <label>Last Name</label>
            <input
              name="name.last"
              value={form.name.last}
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
              name="image.url"
              value={form.image.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>Image Alt</label>
            <input
              name="image.alt"
              value={form.image.alt}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>City</label>
            <input
              name="address.city"
              value={form.address.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>Street</label>
            <input
              name="address.street"
              value={form.address.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>House Number</label>
            <input
              name="address.houseNumber"
              value={form.address.houseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <label>ZIP Code</label>
            <input
              name="address.zip"
              value={form.address.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.btnCreate}>
          Update Account
        </button>
      </form>

      {isSnackbar && <div className="snackbar">{snackbarText}</div>}
    </main>
  );
}

export default UpdateUser;
