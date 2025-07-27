import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import LikeButton from "../Likes/LikeButton";
import ExpandableDescription from "../ExpandableDescription/ExpandableDescription";
import { useUser } from "../../context/UserContext";

export default function Card({ card }) {
  const { user } = useUser();

  const isOwner = user?._id === card.user_id;
  // console.log("user._id:", user?._id);
  // console.log("card.user_id:", card.user_id);
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
        <div>
          {" "}
          <ExpandableDescription text={card.description} />
        </div>
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
        {isOwner ? (
          <div className={styles.userActions}>
            {" "}
            <ion-icon
              name="close-outline"
              style={{ fontSize: "1.2rem" }}
            ></ion-icon>
            <Link to={`/update/${card._id}`}>
              <ion-icon
                name="create-outline"
                style={{ fontSize: "1.2rem" }}
              ></ion-icon>{" "}
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className={styles.actionsRightSide}>
          {" "}
          {user ? <LikeButton cardId={card._id} /> : ""}
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
