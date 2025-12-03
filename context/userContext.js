"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getProfile } from "@/api/auth";
import { Loading } from "@/components/Loading";

// Create the context
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const login = (user, token) => {
    setAuthState({ isAuthenticated: true, user, token });

    // Use secure: true only in production
    const cookieOptions = {
      path: "/",
      expires: 2,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "lax", // Add this for better compatibility
    };

    Cookies.set("authToken", token, cookieOptions);
    Cookies.set("id", user.id, cookieOptions);
    Cookies.set("user", JSON.stringify(user), cookieOptions);

    router.push("/Home");
  };

  // Function to handle logout
  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null, token: null });

    const cookieOptions = {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };

    Cookies.remove("authToken", cookieOptions);
    Cookies.remove("id", cookieOptions);
    Cookies.remove("user", cookieOptions);
    router.push("/Home");
  };

  // Initialize authentication on app load
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userId = Cookies.get("id");

    console.log("ID from context: ", userId);

    const fetchUser = async () => {
      // if (!token || !userId) {
      //   setLoading(false);
      //   return;
      // }

      try {

        const userCookie = Cookies.get("user");
        if (userCookie) {
          try {
            const user = JSON.parse(userCookie);
            setAuthState({
              isAuthenticated: true,
              user,
              token,
              loading: false,
            });
            return;
          } catch (parseErr) {
            console.error("Failed to parse user cookie", parseErr);
            setAuthState({ isAuthenticated: false, user: null, token: null });
          }
        }
        
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, []); // Run only on initial render

  //     if (loading) {
  //     return <Loading title="Checking user " />; // Use your loading component
  //   }

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
