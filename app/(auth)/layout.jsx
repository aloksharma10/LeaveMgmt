import Navbar from "@/components/Navbar/Navbar";

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container py-5">{children}</div>
    </>
  );
}
