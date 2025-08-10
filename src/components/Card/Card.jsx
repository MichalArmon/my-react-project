import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import LikeButton from "../Likes/LikeButton";
import ExpandableDescription from "../ExpandableDescription/ExpandableDescription";
import { useUser } from "../../context/UserContext";
import { usePosts } from "../../context/PostContext";

export default function Card({ card }) {
  const { user, setIsLoader } = useUser();
  const { deleteCard } = usePosts();

  const isOwner = user?._id === card.user_id;
  async function handleDeleteCard() {
    try {
      setIsLoader(true);
      await deleteCard(card._id, card.bizNumber);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoader(false);
    }
  }

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
            card.address?.houseNumber,
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
              className={styles.actionsIcon}
              name="close-outline"
              onClick={handleDeleteCard}
              style={{ fontSize: "1.2rem" }}
            ></ion-icon>
            <Link to={`/update/${card._id}`}>
              <ion-icon
                className={styles.actionsIcon}
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
              className={styles.actionsIcon}
              name="call-outline"
              style={{ fontSize: "1.2rem" }}
            ></ion-icon>
          </a>
        </div>
      </div>
    </div>
  );
}
