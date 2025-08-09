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
      <nav
        className="text-stone-100 bg-amber-400 px-2  max-w-screen flex items-center justify-between border-b border-stone-200  py-2 sm:px-6   min-h-[60px]
     "
      >
        <div className="flex gap-0.1 items-center sm:gap-2  sm:flex flex-1 ">
          <ThemeToggleButton className="text-stone-100" />
          <Link to="/about" className="hidden md:block">
            About
          </Link>
          <SearchPosts />
          {/* <button
            className="text-orange-400 bg-stone-100 hidden md:block"
            onClick={onClearPosts}
          >
            Clear
          </button> */}
        </div>
        <div className="flex flex-1 justify-start sm:justify-center ">
          <Link to="/">
            <div className="min-w-[150px] h-auto sm:min-w-[175px]  ">
              <img src={logo} alt="My App Logo" />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end ">
          <span className="hidden md:block font-semibold text-stone-100">
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
          <div
            className=" flex flex-row    max-w-screen bg-stone-50  items-center justify-center mx-auto p-4 gap-2 "
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.09)" }}
          >
            {user?.isAdmin && (
              <>
                <Link to="/adminUsersPage">CRM system</Link>{" "}
                <hr className="h-5 w-px bg-stone-500 opacity-50" />
              </>
            )}

            <Link
              className="hover:text-amber-300 text-stone-500 tracking-tight uppercase text-sm font-semibold"
              to="/fav"
            >
              Fav cards
            </Link>
            <hr className="h-5 w-px bg-stone-500 opacity-50" />
            <Link
              to="/myCards"
              className="hover:text-amber-300 text-stone-500 tracking-tight uppercase text-sm font-semibold"
            >
              My Cards
            </Link>
            {/* <Link
              to={"/create"}
              className="font-semibold inline-block px-2 py-[2px]   uppercase bg-amber-400 cursor-pointer text-stone-100 rounded-md hover:bg-amber-300 transition-all duration-300 focus:outline-none focus:ring"
            >
              +
            </Link> */}
          </div>
        </nav>
      ) : (
        ""
      )}
    </header>
  );
}
