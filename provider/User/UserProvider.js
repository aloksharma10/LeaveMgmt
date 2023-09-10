"use client";
import React, {
  useCallback,
  useContext,
  useState,
} from "react";
import UserContext from "./UserContext";
import { useToast } from "@/components/ui/use-toast";
import { userSignup } from "@/actions/userAction";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const { toast } = useToast();

  const session = useSession();
  console.log(session);

  const handleUserSignup = useCallback(
    async (formData) => {
      const name = formData.get("name");
      const role = formData.get("role");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const password = formData.get("password");
      if (name.length > 2 && role && email.includes("@") && phone && password) {
        const { status } = await userSignup(formData);
        if (status == 200) {
          setStatus(true);
          toast({
            className: "bg-black text-white",
            title: "Success",
            description: "Your signup request has been submitted for approval.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Please enter the valid details!",
        });
      }
    },
    [toast]
  );

  const handleUserLogin = useCallback(
    async (formData) => {
      const email = formData.get("email");
      const password = formData.get("password");
      const role = formData.get("role");

      const userData = {
        email: email,
        password: password,
        role: role,
      };
      if (role && email.includes("@") && password) {
        const { error } = await signIn("credentials", {
          ...userData,
          redirect: false,
        });

        switch (error) {
          case "User not found!":
            toast({
              variant: "destructive",
              title: "Invalid Credentials!",
            });
            break;
          case "Invalid Credentials!":
            toast({
              variant: "destructive",
              title: "Invalid Credentials!",
            });
            break;
          case "waiting for approval!":
            toast({
              variant: "destructive",
              title: "Your profile is currently in the queue for approval!",
            });
            break;
          default:
            toast({
              className: "bg-black text-white",
              title: "Success",
              description:
                "Your login request has been submitted for approval.",
            });
            redirect(role.toLowerCase() == "admin" ? "/admin" : "/");
            break;
        }
      } else {
        toast({
          variant: "destructive",
          title: "Please enter the valid details!",
        });
      }
    },
    [toast]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        handleUserSignup,
        handleUserLogin,
      }}
    >
      {children}
    </UserContext.Provider>
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
