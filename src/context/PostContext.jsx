import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const PostContext = createContext();

function PostProvider({ children }) {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [card, setCard] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [likes, setLikes] = useState({});
  const [myCards, setMyCards] = useState([]);
  const userID = localStorage.getItem("userID");
  false;

  useEffect(() => {
    if (user && userID) {
      const filtered = posts.filter((post) => post.user_id === userID);
      setMyCards(filtered);
    } else {
      setMyCards([]);
    }
  }, [posts, user]);

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
    setSearchQuery("");
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

  // ✅   GET BY ID
  const fetchCardById = async (id) => {
    setIsLoader(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (!res.ok) throw new Error("כשל בקבלת הכרטיס מהשרת");
      const data = await res.json();
      setCard(data);
      setError("");
      return data;
    } catch (err) {
      setError(err.message || "שגיאה כללית");
    } finally {
      setIsLoader(false);
    }
  };

  // ✅  DELETE CARD
  const deleteCard = async (id, bizNumber) => {
    setIsLoader(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bizNumber }),
        }
      );

      if (!res.ok)
        throw new Error("Unable to fetch the card from the server! ");
      const data = await res.json();

      setPosts((prev) => prev.filter((c) => c._id !== id));

      if (card?._id === id) setCard(null);

      setError("");
      return data;
    } catch (err) {
      setError(err.message || " ");
    } finally {
      setIsLoader(false);
    }
  };

  // ✅ יצירת כרטיס חדש
  async function addNewCard(cardData, token) {
    try {
      const res = await fetch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(cardData),
        }
      );

      if (!res.ok) {
        const contentType = res.headers.get("content-type");

        let errorMessage;
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = errorData.message || "שגיאה ביצירת כרטיס";
        } else {
          errorMessage = await res.text(); // ← זה יתפוס את ה־"Joi Error:"
        }

        throw new Error(errorMessage);
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
  // ✅ updatecard
  const updateCard = async (id, updatedData) => {
    const token = localStorage.getItem("token");

    try {
      setIsLoader(true);

      const res = await fetch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(updatedData),
        }
      );

      let result;
      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(errorData.message || "שגיאה בעדכון כרטיס");
        } else {
          const errorText = await res.text();
          throw new Error("שגיאת שרת: " + errorText);
        }
      }

      result = await res.json();
      console.log("כרטיס עודכן בהצלחה:", result);

      setPosts((prev) => prev.map((card) => (card._id === id ? result : card)));
      return result;
    } catch (err) {
      console.error("❌ שגיאה:", err.message);
      throw err; // חשוב להחזיר את השגיאה למעלה כדי ש־UpdateCard.jsx תוכל לטפל בה
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        deleteCard,
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
        updateCard,
        myCards,
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
