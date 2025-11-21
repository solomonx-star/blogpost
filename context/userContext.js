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

  // Function to handle login
  // Function to handle login
  const login = (user, token) => {
    setAuthState({ isAuthenticated: true, user, token });

    // Use secure: true only in production
    const cookieOptions = {
      expires: 2,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "lax", // Add this for better compatibility
    };

    Cookies.set("authToken", token, cookieOptions);
    Cookies.set("_id", user._id, cookieOptions);
    Cookies.set("user", JSON.stringify(user), { expires: 2, secure: false });

    router.push("/Home");
  };

  // Function to handle logout
const logout = () => {
  setAuthState({ isAuthenticated: false, user: null, token: null });
  
  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  };
  
  Cookies.remove("authToken", cookieOptions);
  Cookies.remove("_id", cookieOptions);
  Cookies.remove("user", cookieOptions);
  
  router.push("/Home");
};

  // Initialize authentication on app load
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userId = Cookies.get("_id");

    const fetchUser = async () => {
      if (!token || !userId) {
        setLoading(false);
        console.error("No token or user ID found in cookies");
        // logout(); // Logout if token or user ID is missing
        return;
      }

      try {
        // Fetch user data
        const response = await getProfile(userId);

        console.log("User Profile: ", response);

        // Update authentication state
        setAuthState({
          isAuthenticated: true,
          user: response,
          token: token,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
        }

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
                  }
                }
                setAuthState({ isAuthenticated: false, user: null, token: null});
        // logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    console.log(authState.user)
  }, []); // Run only on initial render

//     if (loading) {
//     return <Loading title="Checking user " />; // Use your loading component
//   }

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
