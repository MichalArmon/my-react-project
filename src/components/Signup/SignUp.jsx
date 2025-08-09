// src/features/auth/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import signupSchema from "../../helpers/signupSchema";
import { useUser } from "../../context/UserContext";
import Input from "../../ui/form/Input";
import styles from "./SignUp.module.css";
// הופכים את אובייקט החוקים לסכימת Joi מלאה
const schema = Joi.object(signupSchema);

export default function SignUp() {
  const navigate = useNavigate();
  const { createNewUser } = useUser();

  const [form, setForm] = useState({
    email: "",
    password: "Abc!123Abc",
    name: { first: "", middle: "", last: "" },
    phone: "",
    image: { url: "", alt: "" },
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

  const [errors, setErrors] = useState({});
  const [snackbarText, setSnackbarText] = useState("");
  const [isSnackbar, setIsSnackbar] = useState(false);

  const snackbar = (text) => {
    setSnackbarText(text);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 2000);
  };

  // עדכון ערכים בשדות מקוננים לפי name עם נקודות (name.first, image.url וכו')
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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

  // ממפים את ה־form המבני לאובייקט "שטוח" לפי מפתחי הסכמה של Joi
  const mapToSchemaShape = (f) => ({
    first: f.name.first,
    middle: f.name.middle,
    last: f.name.last,
    phone: f.phone,
    email: f.email,
    password: f.password,
    url: f.image.url,
    alt: f.image.alt,
    state: f.address.state,
    country: f.address.country,
    city: f.address.city,
    street: f.address.street,
    houseNumber: Number(f.address.houseNumber),
    zip: f.address.zip === "" ? undefined : Number(f.address.zip),
    isBusiness: f.isBusiness,
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 1) ולידציה מול Joi
    const toValidate = mapToSchemaShape(form);
    const { error } = schema.validate(toValidate, { abortEarly: false });

    if (error) {
      // ממפים שגיאות לאובייקט לפי שם השדה בסכמה (first, email, ...)
      const errMap = {};
      for (const d of error.details) {
        const key = d.path[0];
        if (!errMap[key]) errMap[key] = d.message;
      }
      setErrors(errMap);
      snackbar("בדקי את השדות המסומנים");
      return;
    }

    setErrors({});

    // 2) שליחה לשרת עם המבנה המקורי (מקונן)
    try {
      await createNewUser(form);
      snackbar("נרשמת בהצלחה!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      snackbar(err.message || "שגיאה בהרשמה");
    }
  };

  return (
    <main className={styles.signupForm}>
      <h1 className="uppercase text-stone-900 text-center mb-3">sign up</h1>

      <form onSubmit={handleSignUp}>
        <div className={styles.formGrid}>
          {/* Name */}
          <div>
            <Input
              placeholder="First Name"
              name="name.first"
              value={form.name.first}
              onChange={handleChange}
              required
            />
            {errors.first && (
              <p className="text-red-600 text-sm">{errors.first}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Middle Name"
              name="name.middle"
              value={form.name.middle}
              onChange={handleChange}
            />
            {errors.middle && (
              <p className="text-red-600 text-sm">{errors.middle}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Last Name"
              name="name.last"
              value={form.name.last}
              onChange={handleChange}
              required
            />
            {errors.last && (
              <p className="text-red-600 text-sm">{errors.last}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <Input
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <Input
              placeholder="Image URL"
              name="image.url"
              value={form.image.url}
              onChange={handleChange}
            />
            {errors.url && <p className="text-red-600 text-sm">{errors.url}</p>}
          </div>

          <div>
            <Input
              placeholder="Image Alt"
              name="image.alt"
              value={form.image.alt}
              onChange={handleChange}
            />
            {errors.alt && <p className="text-red-600 text-sm">{errors.alt}</p>}
          </div>

          {/* Address */}
          <div>
            <Input
              placeholder="Country"
              name="address.country"
              value={form.address.country}
              onChange={handleChange}
              required
            />
            {errors.country && (
              <p className="text-red-600 text-sm">{errors.country}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="City"
              name="address.city"
              value={form.address.city}
              onChange={handleChange}
              required
            />
            {errors.city && (
              <p className="text-red-600 text-sm">{errors.city}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Street"
              name="address.street"
              value={form.address.street}
              onChange={handleChange}
              required
            />
            {errors.street && (
              <p className="text-red-600 text-sm">{errors.street}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="House Number"
              name="address.houseNumber"
              value={form.address.houseNumber}
              onChange={handleChange}
              required
            />
            {errors.houseNumber && (
              <p className="text-red-600 text-sm">{errors.houseNumber}</p>
            )}
          </div>
          <div className="flex border border-amber-400 rounded text-sm text-stone-400 items-center">
            <input
              className="h-4"
              type="checkbox"
              name="isBusiness"
              checked={form.isBusiness}
              onChange={handleChange}
            />
            <span>Business account</span>
          </div>
          {errors.isBusiness && (
            <p className="text-red-600 text-sm col-span-1 md:col-span-2">
              {errors.isBusiness}
            </p>
          )}
          <div>
            <Input
              placeholder="ZIP Code"
              name="address.zip"
              value={form.address.zip}
              onChange={handleChange}
            />
            {errors.zip && <p className="text-red-600 text-sm">{errors.zip}</p>}
          </div>

          {/* isBusiness */}
        </div>
        <button
          type="submit"
          className="bg-[#ffa94d] mt-4 block w-full p-3 text-white rounded-lg hover:opacity-90"
        >
          Create Account
        </button>
      </form>

      {isSnackbar && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-4 py-2 rounded">
          {snackbarText}
        </div>
      )}
    </main>
  );
}
