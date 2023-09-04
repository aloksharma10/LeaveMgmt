"use client";
import React, { useContext } from "react";
import UserContext from "./UserContext";
function UserProvider({ children }) {
  function userSignup() {
    

  }

  const alok = "haaji";
  return (
    <UserContext.Provider value={{ alok }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;

export function useUserProvider() {
  const context = useContext(UserContext);
  if (context == undefined) {
    throw new Error("component and page must be inside the provider");
  }
  return context;
}
