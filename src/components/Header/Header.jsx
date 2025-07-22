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
  const { currentUser, loginUser, setLoginUser } = useUser();

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
            {currentUser?.name?.first
              ? `Welcome ${currentUser.name.first} `
              : "Welcome guest"}
          </span>
          <Link to="/login" className={styles.btnLogin}>
            {currentUser ? (
              <div className={styles.profileIcon}>
                {currentUser.name.first.slice(0, 1).toUpperCase()}
              </div>
            ) : (
              <ion-icon
                name="person-circle-outline"
                style={{ color: "#ffffffff", fontSize: "1.6rem" }}
              ></ion-icon>
            )}
          </Link>
        </div>
      </nav>
      {loginUser ? (
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
