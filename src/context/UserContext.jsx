import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoader, setIsLoader] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbarText, setSnackbarText] = useState("");
  const [isSnackbar, setIsSnackbar] = useState(false);

  const navigate = useNavigate();

  const snackbar = (text) => {
    setSnackbarText(text);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 2000);
  };

  // 🧠 פענוח טוקן JWT
  function decodeToken(token) {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  const getUser = async (id) => {
    try {
      setIsLoader(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        const errorMessage = contentType?.includes("application/json")
          ? (await res.json()).message
          : await res.text();
        throw new Error(errorMessage);
      }

      const user = await res.json();
      console.log("👤 currentUser from server:", user);
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));

      return user; // ✅ שורה חשובה שחסרה לך קודם
    } catch (err) {
      console.error("Error fetching user:", err.message);
    } finally {
      setIsLoader(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      setIsLoader(true);
      const res = await fetch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const errMsg = res.headers
          .get("content-type")
          ?.includes("application/json")
          ? (await res.json()).message
          : await res.text();
        throw new Error(errMsg || "Login failed");
      }

      const contentType = res.headers.get("content-type");
      const data = contentType.includes("application/json")
        ? await res.json()
        : { token: await res.text() };

      const token = data.token;
      localStorage.setItem("token", token);
      snackbar("Logged in 🎉");
      setLoginUser(true);

      // ✅ שולפים את ה־ID מתוך הטוקן
      const decoded = decodeToken(token);
      if (decoded?._id) {
        await getUser(decoded._id); // מביא יוזר מלא ושומר
      }

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      snackbar(" Error:" + err.message);
      setCurrentUser(null);
    } finally {
      setIsLoader(false);
    }
  };

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

      const user = await res.json();
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      snackbar("נרשמת בהצלחה 🎉");
      return user;
    } catch (err) {
      throw new Error("Registration failed: " + err.message);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  return (
    <UserContext.Provider
      value={{
        login,
        isLoader,
        loginUser,
        snackbarText,
        isSnackbar,
        currentUser,
        createNewUser,
        setCurrentUser,
        getUser,
        decodeToken,

        setLoginUser,
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
