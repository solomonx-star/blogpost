import React from "react";
import { Navbar } from "../Navbar/page";

export const NavWrapper = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
