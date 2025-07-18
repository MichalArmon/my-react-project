import React, { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [card, setCard] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [likes, setLikes] = useState({});

  // טען לייקים מה-localStorage
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(storedLikes);
  }, []);

  // שמור לייקים ב-localStorage
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  function addLike(cardId) {
    setLikes((prev) => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) + 1,
    }));
  }

  function removeLike(cardId) {
    setLikes((prev) => {
      const newLikes = { ...prev };
      if (newLikes[cardId]) newLikes[cardId]--;
      if (newLikes[cardId] <= 0) delete newLikes[cardId];
      return newLikes;
    });
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  // ✅ שליפת כל הכרטיסים
  const getData = async () => {
    setIsLoader(true);
    const token = localStorage.getItem("token");

    const headers = token ? { "x-auth-token": token } : {};

    try {
      const res = await fetch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        {
          method: "GET",
          headers,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "שגיאה בקבלת הנתונים מהשרת");
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("❌ שגיאה ב-getData:", err);
      setError(err.message || "שגיאה כללית");
    } finally {
      setIsLoader(false);
    }
  };

  // ✅ שליפת כרטיס לפי ID
  const fetchCardById = async (id) => {
    setIsLoader(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/bcard2/users/cards/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      if (!res.ok) throw new Error("כשל בקבלת הכרטיס מהשרת");
      const data = await res.json();
      setCard(data);
      setError("");
    } catch (err) {
      setError(err.message || "שגיאה כללית");
      setCard(null);
    } finally {
      setIsLoader(false);
    }
  };

  // ✅ יצירת כרטיס חדש
  async function addNewCard(cardData, token) {
    try {
      const res = await fetch("/api/bcard2/users/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(cardData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "שגיאה ביצירת כרטיס");
      }

      const newCard = await res.json();
      console.log("כרטיס חדש:", newCard);
      setPosts((prev) => [newCard, ...prev]);
      return newCard;
    } catch (err) {
      console.error("שגיאה:", err.message);
      throw err;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        setPosts,
        isLoader,
        setIsLoader,
        isDark,
        setIsDark,
        searchQuery,
        setSearchQuery,
        onClearPosts: handleClearPosts,
        fetchCardById,
        card,
        error,
        setError,
        likes,
        addLike,
        removeLike,
        addNewCard,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  return useContext(PostContext);
}

export { PostProvider, usePosts };
