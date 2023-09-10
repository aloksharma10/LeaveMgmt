"use client";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function CustomeLayout({ children }) {
  return (
    <SessionProvider>
      <ProgressBar
        height="3px"
        color="black"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </SessionProvider>
  );
}
