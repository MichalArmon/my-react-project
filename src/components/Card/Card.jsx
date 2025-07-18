import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import LikeButton from "../Likes/LikeButton";
import ExpandableDescription from "../ExpandableDescription/ExpandableDescription";

export default function Card({ card }) {
  return (
    <div className={styles.Card}>
      {/* תמונה מקשרת לדף מורחב */}
      <div className={styles.imgWarper}>
        <Link to={`/card/${card._id}`}>
          <img
            src={card.image?.url}
            alt={card.image?.alt || "business image"}
            className={styles.image}
          />
        </Link>
      </div>

      <div className={styles.cardDetails}>
        <Link to={`/card/${card._id}`}>
          <h2>{card.title}</h2>
        </Link>
        <p>
          {" "}
          <ExpandableDescription text={card.description} />
        </p>
      </div>

      <div className={styles.cardInfo}>
        <p>
          <strong>Address:</strong>{" "}
          {[
            card.address?.street,
            card.address?.number,
            card.address?.city,
            card.address?.zip,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
        <p>
          <strong>Phone:</strong> <a href={`tel:${card.phone}`}>{card.phone}</a>
        </p>
        <p>
          <strong>Card number:</strong> {card._id}
        </p>
      </div>

      <div className={styles.actions}>
        <div>
          {" "}
          <LikeButton cardId={card._id} />
        </div>
        <div>
          <a href={`tel:${card.phone}`}>
            <ion-icon
              name="call-outline"
              style={{ fontSize: "1.2rem" }}
            ></ion-icon>
          </a>
        </div>
      </div>
    </div>
  );
}
