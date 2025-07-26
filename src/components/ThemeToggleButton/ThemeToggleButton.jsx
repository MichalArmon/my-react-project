import { useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import styles from "./ThemeToggleButton.module.css";
import React from "react";

export default function ThemeToggleButton() {
  const { isDark, setIsDark } = usePosts();

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.remove("dark-mode");
      root.classList.add("light-mode");
    }
  }, [isDark]);

  return (
    <button onClick={toggleTheme} className={styles.btnDark}>
      {isDark ? (
        <ion-icon
          name="sunny-outline"
          style={{ fontSize: "1.6rem" }}
        ></ion-icon>
      ) : (
        <ion-icon name="moon-outline" style={{ fontSize: "1.6rem" }}></ion-icon>
      )}
    </button>
  );
}
