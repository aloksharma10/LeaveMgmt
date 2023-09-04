"use client"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function CustomeLayout({ children }) {
  return (
    <>
        <ProgressBar
          height="4px"
          color="black"
          options={{ showSpinner: false }}
          shallowRouting
        />
    </>
  );
}
