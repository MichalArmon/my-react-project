import { usePosts } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";
import Card from "../Card/Card";
import styles from "./MyCardsList.module.css";
import { Link, useNavigate } from "react-router-dom";
import CreateCard from "../CreateCard/CreateCard";

function MyCardsList() {
  const { posts, myCards } = usePosts();
  const { user } = useUser();

  // const userID = localStorage.getItem("userID");
  // false;
  // const user = JSON.parse(localStorage.getItem("user"));

  // אם המשתמש לא מחובר
  if (!user) return <p className={styles.snackbar}> You are not logged in!</p>;

  // סינון רק כרטיסים שנוצרו על ידי המשתמש הנוכחי
  // const myCards = posts.filter((post) => post.user_id === userID);

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
