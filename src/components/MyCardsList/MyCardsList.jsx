import { usePosts } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";
import Card from "../Card/Card";
import styles from "./MyCardsList.module.css";
import { Link, useNavigate } from "react-router-dom";
import CreateCard from "../CreateCard/CreateCard";

function MyCardsList() {
  const { posts, myCards } = usePosts();
  const { user } = useUser();

  if (!user) return <p className={styles.snackbar}> You are not logged in!</p>;

  if (myCards.length === 0)
    return <p className={styles.snackbar}>create your first card!</p>;

  return (
    <div className={styles.warper}>
      <Link to={"/create"} className={styles.addCard}>
        + CREATE NEW CARD
      </Link>

      <div className={styles.cardGrid}>
        {myCards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
}
export default MyCardsList;
