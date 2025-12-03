// "use client";

// import { useRouter } from "next/navigation";
// import React, { createContext, useContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { getProfile } from "@/api/auth";

// // Create the context
// export const AuthContext = createContext();

// // Custom hook to use AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // AuthProvider component to wrap around the app
// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     user: null,
//     token: null,
//     loading: true,
//   });
//   const router = useRouter();

//   // Function to handle login
//   const login = (user, token) => {
//     setAuthState({ isAuthenticated: true, user, token, loading: false });
//     // Save token and user data to cookies for persistence
//     Cookies.set("authToken", token, { expires: 2, secure: true }); // Cookie expires in 2 days
//     Cookies.set("_id", user._id, { expires: 2, secure: true }); // Save user ID
//     Cookies.set("user", JSON.stringify(user), { expires: 2, secure: true }); // Save user info
//     router.push("/Home");
//   };

//   // Function to handle logout
//   const logout = () => {
//     setAuthState({
//       isAuthenticated: false,
//       user: null,
//       token: null,
//       loading: false,
//     });
//     Cookies.remove("authToken"); // Remove the token cookie
//     Cookies.remove("_id"); // Remove the user ID cookie
//     Cookies.remove("user"); // Remove the user cookie
//     router.push("/login");
//   };

//   // Initialize authentication on app load
//   useEffect(() => {
//     const token = Cookies.get("authToken");
//     const userId = Cookies.get("_id");

//     const fetchUser = async () => {
//       if (!token || !userId) {
//         setAuthState({
//           isAuthenticated: false,
//           user: null,
//           token: null,
//           loading: false,
//         });
//         return;
//       }

//       try {
//         // Fetch user data from backend
//         // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         const userCookie = Cookies.get("user");
//         if (userCookie) {
//           try {
//             const user = JSON.parse(userCookie);
//             setAuthState({
//               isAuthenticated: true,
//               user,
//               token,
//               loading: false,
//             });
//             return;
//           } catch (parseErr) {
//             console.error("Failed to parse user cookie", parseErr);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         // Only log out if backend says unauthorized/forbidden
//         if (err.response?.status === 401 || err.response?.status === 403) {
//           // logout();
//           return;
//         }
//         Cookies.remove("authToken"); // Remove the token cookie
//         Cookies.remove("_id"); // Remove the user ID cookie
//         Cookies.remove("user"); // Remove the user cookie

//         setAuthState({
//           isAuthenticated: false,
//           user: null,
//           token: null,
//           loading: false,
//         });
//       }
//     };

//     fetchUser();
//   }, []); // Run only on initial render

//   if (authState.loading) {
//     return <div>Loading...</div>; // Or a spinner component
//   }

//   return (
//     <AuthContext.Provider value={{ authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
