import React from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import BigCard from "./components/BigCard/BigCard.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login.jsx";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage.jsx";
import MyCards from "./Pages/Mycards/MyCards.jsx";
import SignUp from "./components/Signup/SignUp.jsx";
import CreateCard from "./components/CreateCard/CreateCard.jsx";
import UpdateCard from "./components/UpdateCard/UpdateCard.jsx";

import "./index.css";
import { PostProvider } from "./context/PostContext.jsx";
import { UserProvider } from "./context/UserContext";
import Footer from "./components/Footer/Footer.jsx";
import AdminUsersPage from "./Pages/AdminUsersPage/AdminUsersPage.jsx";
import UpdateUser from "./components/UpdateUser/UpdateUser.jsx";
import AppLayout from "./Pages/AppLayout.jsx";

function App() {
  return (
    <UserProvider>
      <PostProvider>
        <Routes>
          <Route Route element={<AppLayout />}>
            <Route path="/adminUsersPage" element={<AdminUsersPage />} />
            <Route path="/updateUser/:id" element={<UpdateUser />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/fav" element={<FavoritesPage />} />
            <Route path="/card/:id" element={<BigCard />} />
            <Route path="/myCards" element={<MyCards />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create" element={<CreateCard />} />
            <Route path="/update/:id" element={<UpdateCard />} />
          </Route>
        </Routes>
      </PostProvider>
    </UserProvider>
  );
}

export default App;
