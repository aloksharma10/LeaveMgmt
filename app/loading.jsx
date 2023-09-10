import Logo from "@/components/Logo/Logo";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Logo className="animate-spin text-6xl"/>
    </div>
  );
}
