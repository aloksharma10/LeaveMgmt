import Logo from "@/components/Logo/Logo";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo className="animate-spin text-6xl"/>
    </div>
  );
}
