import { useState } from "react";
import styles from "./CreateCard.module.css";
import { usePosts } from "../../context/PostContext";

export default function CreateCard() {
  const { addNewCard } = usePosts();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    street: "",
    city: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const cardData = {
      title: form.title,
      subtitle: form.subtitle || "Business Subtitle",
      description: form.description,
      phone: form.phone,
      email: form.email,
      web: "https://example.com",
      image: {
        url: "https://picsum.photos/300",
        alt: "business image",
      },
      address: {
        state: "",
        country: "Israel",
        city: form.city,
        street: form.street,
        houseNumber: 1,
        zip: 12345,
      },
    };

    try {
      const newCard = await addNewCard(cardData, token);
      console.log("כרטיס חדש:", newCard);

      setForm({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        street: "",
        city: "",
      });

      alert("כרטיס נוצר בהצלחה!");
    } catch (err) {
      console.error(err);
      alert("שגיאה ביצירת הכרטיס");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>צור כרטיס חדש</h2>

      <input
        type="text"
        name="title"
        placeholder="שם העסק"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="subtitle"
        placeholder="תת כותרת"
        value={form.subtitle}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="תיאור"
        value={form.description}
        onChange={handleChange}
        rows="3"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="טלפון"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="אימייל"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="street"
        placeholder="רחוב"
        value={form.street}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="city"
        placeholder="עיר"
        value={form.city}
        onChange={handleChange}
        required
      />

      <button type="submit">צור כרטיס</button>
    </form>
  );
}
