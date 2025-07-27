import { useEffect, useState } from "react";
import styles from "./UpdateCard.module.css";
import { usePosts } from "../../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";

useNavigate;
export default function UpdateCard() {
  const { id } = useParams();
  const { updateCard, fetchCardById } = usePosts();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function fetchCard() {
      try {
        const card = await fetchCardById(id);
        setForm(card); // מילוי הטופס לפי הכרטיס שקיבלנו
      } catch (err) {
        console.error("❌ שגיאה בטעינת כרטיס:", err);
      }
    }

    fetchCard();
  }, [id]);

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
        houseNumber: Number(form.address.houseNumber),
        zip: Number(form.address.zip),
      },
    };

    try {
      const updatedCard = await updateCard(id, cardData);
      console.log("updatedCard:", updatedCard);

      navigate("/myCards");

      alert("Card updated successfully!");
      console.log("🆔 useParams id:", id);
    } catch (err) {
      console.error(err);
      alert("Error updating card");
    }
  }
  if (!form) return <p>Loading card...</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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

      <button type="submit">Update card</button>
    </form>
  );
}
