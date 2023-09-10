import Link from "next/link";

export default function NotFound() {
  return (
    <main class="flex flex-col justify-center items-center py-[25vh] ">
      <h1 class="text-[12rem] font-extrabold text-black dark:text-white tracking-widest">
        404
      </h1>
      <div class="bg-black text-white px-1 text-lg rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-2">
        <a class="relative inline-block text-lg font-medium text-white group  focus:outline-none focus:ring">
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-black group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span class="relative block px-8 py-3 bg-black border">
            <Link href="/">Go Home</Link>
          </span>
        </a>
      </button>
    </main>
  );
}
