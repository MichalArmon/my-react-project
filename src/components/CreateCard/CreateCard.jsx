import { useState } from "react";
import styles from "./CreateCard.module.css";
import { usePosts } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";
useNavigate;
export default function CreateCard() {
  const { addNewCard } = usePosts();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "Green Garden",
    subtitle: "Your local plant expert",
    description: "We offer a wide variety of indoor and outdoor plants,",
    phone: "03-7654321",
    email: "info@greengarden.co.il",
    web: "https://greengarden.co.il",
    image: {
      url: "https://picsum.photos/300/200",
      alt: "Photo of Green Garden shop front",
    },
    address: {
      state: "Israel",
      country: "israel",
      city: "Ramat Gan",
      street: "HaYarkon",
      houseNumber: "12",
      zip: "5250000",
    },
  });

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

    const cardData = {
      title: form.title,
      subtitle: form.subtitle || "Business Subtitle",
      description: form.description,
      phone: form.phone,
      email: form.email,
      web: form.web,
      image: {
        url: form.image.url,
        alt: form.image.alt,
      },
      address: {
        state: form.address.state,
        country: "Israel",
        city: form.address.city,
        street: form.address.street,
        houseNumber: 1,
        zip: 12345,
      },
    };

    try {
      const newCard = await addNewCard(cardData, token);
      console.log("כרטיס חדש:", newCard);
      navigate("/myCards");

      // setForm({
      //   title: "",
      //   subtitle: "",
      //   description: "",
      //   phone: "",
      //   web: "",
      //   image: { url: "", alt: "" },
      //   address: {
      //     state: "Israel",
      //     country: "israel",
      //     city: "",
      //     street: "",
      //     houseNumber: "",
      //     zip: "",
      //   },
      // });

      alert("כרטיס נוצר בהצלחה!");
    } catch (err) {
      console.error(err);
      alert("שגיאה ביצירת הכרטיס");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Create new card</h2>
      <div className={styles.formGrid}>
        <input
          type="text"
          name="title"
          placeholder="Business name"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="image.url"
          placeholder="Image URL"
          value={form.image.url}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image.alt"
          placeholder="Image alt text"
          value={form.image.alt}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address.country"
          placeholder="Country"
          value={form.address.country}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address.state"
          placeholder="State"
          value={form.address.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address.city"
          placeholder="City"
          value={form.address.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address.street"
          placeholder="Street"
          value={form.address.street}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address.houseNumber"
          placeholder="House number"
          value={form.address.houseNumber}
          onChange={handleChange}
        />

        <input
          className={styles.flexend}
          type="text"
          name="address.zip"
          placeholder="ZIP code"
          value={form.address.zip}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.btnCreate}>
        Create card
      </button>
    </form>
  );
}
