import React from "react";

import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";

import BigCard from "./components/BigCard/BigCard.jsx";

import HomePage from "./Pages/HomePage/HomePage.jsx";
import About from "./Pages/About.jsx";

import Login from "./Pages/Login/Login.jsx"; // ייתכן שתרצי לשנות את השם בעתיד

import "./index.css";
import { PostProvider } from "./context/PostContext.jsx";
import { UserProvider } from "./context/UserContext";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage.jsx";
import MyCards from "./Pages/Mycards/MyCards.jsx";
import SignUp from "./components/Signup/SignUp.jsx";

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <Header />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/fav" element={<FavoritesPage />} />
            <Route path="/card/:id" element={<BigCard />} />
            <Route path="/myCards" element={<MyCards />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
