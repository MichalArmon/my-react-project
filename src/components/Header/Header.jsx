import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostContext";
import SearchPosts from "../SearchPosts";
import React from "react";

import styles from "./Header.module.css";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import logo from "../../assets/logo.svg";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
        <div className={styles.leftSide}>
          <ThemeToggleButton className={styles.modeIcon} />
          <Link to="/about">About</Link>
          <SearchPosts />
          <button className={styles.clear} onClick={onClearPosts}>
            Clear
          </button>
        </div>
        <div className={styles.middlePart}>
          <Link to="/">
            <div className={styles.logo}>
              <img src={logo} alt="My App Logo" className="logo" />
            </div>
          </Link>
        </div>
        <div className={styles.logWarper}>
          <span className={styles.greeting}>
            {user && firstName ? (
              <>
                Welcome <strong>{formattedFirstName}</strong>
              </>
            ) : (
              <span>
                Welcome <strong>Guest</strong>
              </span>
            )}
          </span>
          <Link to="/login" className={styles.btnLogin}>
            {user ? (
              <div className={styles.profileIcon}>{firstLetter}</div>
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#fff", fontSize: "1.2rem" }}
              />
            )}
          </Link>
        </div>
      </nav>
      {user ? (
        <nav>
          <div className={styles.UserNav}>
            {user?.isAdmin && (
              <Link to="/adminUsersPage">Admin Users Page</Link>
            )}

            <Link to="/fav">Fav cards</Link>
            <Link to="/myCards">My Cards</Link>
            <Link to={"/create"} className={styles.addCard}>
              +
            </Link>
          </div>
        </nav>
      ) : (
        ""
      )}
    </header>
  );
}
