import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostContext";
import SearchPosts from "../SearchPosts";
import React from "react";

import styles from "./Header.module.css";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import logo from "../../assets/logo.svg";
import { useUser } from "../../context/UserContext";

export default function Header() {
  const { onClearPosts } = usePosts();
  const { user } = useUser();
  // const firstName = user?.name?.first || "";

  const firstName = user?.name?.first;
  const firstLetter = firstName ? firstName.slice(0, 1).toUpperCase() : "";
  const formattedFirstName = firstName ? firstLetter + firstName.slice(1) : "";

  return (
    <header>
      <nav className={styles.AppNav}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="My App Logo" className="logo" />
          </div>
        </Link>
        <div className={styles.logWarper}>
          <span className={styles.greeting}>
            {user && firstName
              ? `Welcome ${formattedFirstName} `
              : "Welcome guest"}
          </span>
          <Link to="/login" className={styles.btnLogin}>
            {user ? (
              <div className={styles.profileIcon}>{firstLetter}</div>
            ) : (
              <ion-icon
                name="person-circle-outline"
                style={{ color: "#ffffffff", fontSize: "2rem" }}
              ></ion-icon>
            )}
          </Link>
        </div>
      </nav>
      {user ? (
        <nav>
          <div className={styles.UserNav}>
            <Link to="/about">About</Link>
            <Link to="/fav">Fav cards</Link>
            <Link to="/myCards">My Cards</Link>
            <SearchPosts />
            <button onClick={onClearPosts}>Clear posts</button>
            <ThemeToggleButton />
          </div>
        </nav>
      ) : (
        ""
      )}
    </header>
  );
}
