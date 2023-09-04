"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import AuthSideContainer from "../AuthSideContainer";
import SignupForm from "./SignupForm";

function Signup() {
  return (
    <div className="relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Signup;
