import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoader, setIsLoader] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbarText, setSnackbarText] = useState("");
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [userType, setUserType] = useState("guest");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const snackbar = (text) => {
    setSnackbarText(text);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 2000);
  };

  // JWT
  function decodeToken(token) {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
  const createNewUser = async (form) => {
    const newUser = {
      email: form.email,
      password: form.password,
      name: {
        first: form.firstName,
        middle: "",
        last: form.lastName,
      },
      phone: form.phone,
      image: {
        url: form.imageUrl,
        alt: form.imageAlt,
      },
      address: {
        state: "IL",
        country: "Israel",
        city: form.city,
        street: form.street,
        houseNumber: +form.houseNumber,
        zip: +form.zip,
      },
      isBusiness: true,
    };

    try {
      const res = await fetch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg);
      }

      const data = await res.json();
      setTimeout(() => navigate("/login"), 1000);
      snackbar("נרשמת בהצלחה 🎉");
      setUser(data);
      localStorage.setItem("userName", data.name.first);
      console.log(user);
    } catch (err) {
      throw new Error("Registration failed: " + err.message);
    }
  };

  // LOGOUT✅
  async function logout() {
    setIsLoader(true);
    try {
      localStorage.clear();
      setUser(null);
      setCurrentUser(null);
      setLoginUser(false);
      navigate("/");
    } finally {
      setIsLoader(false);
    }
  }

  // GET USER✅
  const getUser = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
      {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("🎯 getUser data:", data);
    return data;
  };

  // UPDATE USER✅
  const updateUser = async (token, id, updatedUser) => {
    const res = await fetch(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    const data = await res.json();
    console.log("🎯 updated data:", data);
    return data;
  };

  return (
    <UserContext.Provider
      value={{
        setIsLoader,
        isLoader,
        loginUser,
        snackbarText,
        isSnackbar,
        currentUser,
        createNewUser,
        setCurrentUser,
        getUser,
        decodeToken,
        user,
        setUser,
        setLoginUser,
        userType,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
