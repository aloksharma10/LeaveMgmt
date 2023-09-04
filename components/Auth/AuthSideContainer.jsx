import React from "react";
import Logo from "../Logo/Logo";

function AuthSideContainer({ title, desc }) {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        <Logo size={32} className="text-white mr-2" />
        <span>Leave Management</span>
        
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">&ldquo;{desc}&rdquo;</p>
          <footer className="text-sm">BCIIT Leave Management</footer>
        </blockquote>
      </div>
    </div>
  );
}

export default AuthSideContainer;
