"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-lg">
      <div className="bg-black p-5 text-white rounded-md">
        <h2 className="font-semibold text-md">Something went wrong!</h2>
        <p className="text-sm text-muted-foreground">
          We&lsquo;re regret to provide you a seamless performance, please try
          again! Error: {error.message}
        </p>

        <div className="mt-3 flex justify-end">
          <Button
            className="bg-white text-black hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => reset()}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
