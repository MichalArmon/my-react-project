import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostContext";
import SearchPosts from "../SearchPosts";
import React from "react";

import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import logo from "../../assets/logo.svg";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faRightToBracket,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.css";
function Footer() {
  const { user } = useUser();
  return (
    <div className={styles.footerWarper}>
      <div className={styles.footer}>
        <div className={styles.col}>
          <FontAwesomeIcon icon={faCircleInfo} size="l" className="mb-1" />
          <Link to="/about">about</Link>
        </div>

        <div className={styles.col}>
          <FontAwesomeIcon icon={faRightToBracket} size="l" className="mb-1" />
          <Link to="/login">Log in</Link>
        </div>
        <div className={styles.col}>
          <FontAwesomeIcon icon={faUserPlus} size="l" className="mb-1" />
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
