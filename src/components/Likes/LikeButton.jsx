import styles from "./LikeButton.module.css";
import { usePosts } from "../../context/PostContext";
import { useEffect, useState } from "react";

export default function LikeButton({ cardId }) {
  const { addLike, removeLike } = usePosts();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const likedCards = JSON.parse(localStorage.getItem("likedCards")) || {};
    setIsClicked(!!likedCards[cardId]);
  }, [cardId]);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const likedCards = JSON.parse(localStorage.getItem("likedCards")) || {};

    if (isClicked) {
      removeLike(cardId);
      delete likedCards[cardId];
      setIsClicked(false);
    } else {
      addLike(cardId);
      likedCards[cardId] = true;
      setIsClicked(true);
    }

    localStorage.setItem("likedCards", JSON.stringify(likedCards));
  }

  return (
    <button
      className={`${styles.button} ${
        isClicked ? styles.liked : styles.notLiked
      }`}
      type="button"
      onClick={handleClick}
    >
      <ion-icon
        className={styles.actionsIcon}
        name={isClicked ? "heart" : "heart-outline"}
      ></ion-icon>
    </button>
  );
}
