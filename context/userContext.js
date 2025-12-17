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
      expires: 7, // Changed from 2 to 7 days for better UX
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };

    // BUG FIX 1: Use 'token' instead of 'authToken' to match what you're reading
    Cookies.set("token", token, cookieOptions);
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

    // BUG FIX 2: Remove 'token' instead of 'authToken'
    Cookies.remove("token", cookieOptions);
    Cookies.remove("id", cookieOptions);
    Cookies.remove("user", cookieOptions);

    router.push("/Home");
  };

  // Initialize authentication on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        // BUG FIX 3: Read 'token' instead of 'authToken'
        const token = Cookies.get("token");
        const userId = Cookies.get("id");
        const userCookie = Cookies.get("user");

        console.log("Token from cookie:", token);
        console.log("ID from cookie:", userId);

        // If no token, user is not authenticated
        if (!token) {
          setAuthState({ isAuthenticated: false, user: null, token: null });
          setLoading(false);
          return;
        }

        // Try to parse user from cookie
        if (userCookie) {
          try {
            const user = JSON.parse(userCookie);
            setAuthState({
              isAuthenticated: true,
              user,
              token,
            });
            setLoading(false);
            return;
          } catch (parseErr) {
            console.error("Failed to parse user cookie:", parseErr);
          }
        }

        // BUG FIX 4: If user cookie is missing but token exists, fetch from API
        if (token && !userCookie) {
          try {
            const userData = await getProfile();
            if (userData && userData.data) {
              const user = userData.data;

              // Save user to cookie for future use
              Cookies.set("user", JSON.stringify(user), {
                path: "/",
                expires: 7,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
              });

              setAuthState({
                isAuthenticated: true,
                user,
                token,
              });
            } else {
              // Token is invalid, clear everything
              logout();
            }
          } catch (error) {
            console.error("Failed to fetch user profile:", error);
            // Token might be expired or invalid
            logout();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setAuthState({ isAuthenticated: false, user: null, token: null });
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []); // Run only on initial render

  // BUG FIX 5: Show loading component while checking auth
  if (loading) {
    return <Loading title="Checking authentication..." />;
  }

  return (
    <AuthContext.Provider value={{ authState, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
