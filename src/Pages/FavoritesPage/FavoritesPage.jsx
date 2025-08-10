// src/pages/FavoritesPage/FavoritesPage.jsx

import styles from "./FavoritesPage.module.css";
import { usePosts } from "../../context/PostContext";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { posts } = usePosts();
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    const likedCards = JSON.parse(localStorage.getItem("likedCards")) || {};
    const likedIds = Object.keys(likedCards);
    const filtered = posts.filter((post) => likedIds.includes(post._id));
    setFavoritePosts(filtered);
  }, [posts]);

  if (favoritePosts.length === 0)
    return (
      <div className=" text-2xl mt-4 flex gap-2 items-center py-2 border-2 border-amber-500 rounded-md bg-amber-50 justify-center font-semibold text-stone-600 mx-auto w-[600px] ">
        You didn't <strong className="text-amber-400">like</strong>
        <ion-icon name="heart-outline"></ion-icon> any cards yet...
      </div>
    );

  return (
    <div className={styles.cardGrid}>
      {favoritePosts.map((post) => (
        <Card key={post._id} card={post} />
      ))}
    </div>
  );
}
