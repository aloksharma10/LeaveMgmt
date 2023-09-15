import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import AuthSideContainer from "../AuthSideContainer";
import SignupForm from "./SignupForm";

function Signup() {
  return (
    <div className="relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "absolute right-4 top-4 md:right-8 md:top-8 bg-gray-100 rounded-md shadow-md hover:bg-gray-200"
        )}
      >
        Login
      </Link>
      <AuthSideContainer
        title="Signup"
        desc="This library has saved me countless hours of work and
          helped me deliver stunning designs to my clients faster than
          ever before."
      />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg shadow-xl rounded-md bg-white">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Signup;
