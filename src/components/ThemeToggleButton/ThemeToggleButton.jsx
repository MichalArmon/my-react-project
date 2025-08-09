import { useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import styles from "./ThemeToggleButton.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
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
        <FontAwesomeIcon
          className="text-sm"
          icon={faSun}
          name="sunny-outline"
          style={{ fontSize: "1.6rem" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          name="moon-outline"
          style={{ fontSize: "1.6rem" }}
        />
      )}
    </button>
  );
}
