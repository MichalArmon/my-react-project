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
        first: form.name.first,
        middle: form.name.middle,
        last: form.name.last,
      },
      phone: form.phone,
      image: {
        url: form.image.url,
        alt: form.image.alt,
      },
      address: {
        state: "IL",
        country: "Israel",
        city: form.address.city,
        street: form.address.street,
        houseNumber: Number(form.address.houseNumber),
        zip: Number(form.address.zip),
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

  // DELETE USER✅

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete user");
    }

    return res.json();
  };

  return (
    <UserContext.Provider
      value={{
        deleteUser,
        snackbar,
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
