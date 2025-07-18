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
    return <p className={styles.empty}>לא הוספת מועדפים עדיין.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
      {favoritePosts.map((post) => (
        <Card key={post._id} card={post} />
      ))}
    </div>
  );
}
