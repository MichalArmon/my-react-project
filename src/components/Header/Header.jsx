import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostContext";
import SearchPosts from "../SearchPosts";
import React from "react";

import styles from "./Header.module.css";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import logo from "../../assets/logo.svg"; // התאימי לפי המיקום בפועל

export default function Header() {
  const { onClearPosts } = usePosts();

  return (
    <header>
      <nav className={styles.AppNav}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="My App Logo" className="logo" />
          </div>
        </Link>
        <Link to="/login" className={styles.btnLogin}>
          <ion-icon
            name="person-circle-outline"
            style={{ color: "#ffffffff", fontSize: "1.6rem" }}
          ></ion-icon>
        </Link>
      </nav>
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
    </header>
  );
}
