"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { useToast } from "@/components/ui/use-toast";
import { userSignup } from "@/actions/userAction";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { applyLeave } from "@/actions/leaveActions";

function UserProvider({ children }) {
  const router = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState({});

  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

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
            router.push(role.toLowerCase() == "admin" ? "/admin" : "/user");
            break;
        }
      } else {
        toast({
          variant: "destructive",
          title: "Please enter the valid details!",
        });
      }
    },
    [toast, router]
  );

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      setUser({});
      toast({
        className: "bg-black text-white",
        title: "Success",
        description: "Logout successfully!",
      });

      return router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    }
  }, [toast, router]);

  const handleApplyLeave = useCallback(
    async (formData, date) => {
      const title = formData.get("title");
      const message = formData.get("message");
      if (title.length > 2 && date.to > date.from) {
        const reqLeaveFormData = {
          title,
          startDate: date.from,
          endDate: date.to,
          message,
          userId: user.id,
        };
        const { status } = await applyLeave(reqLeaveFormData);
        if (status == 200) {
          toast({
            className: "bg-black text-white",
            title: "Success",
            description: "Your leave request has been submitted for approval.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Please enter the valid details!",
        });
      }
    },
    [toast, user.id]
  );
  return (
    <UserContext.Provider
      value={{
        user,
        handleUserSignup,
        handleUserLogin,
        handleSignOut,
        handleApplyLeave,
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
