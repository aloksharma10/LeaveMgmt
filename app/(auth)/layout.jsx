import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Authentication | BCIIT Leave Management Portal",
  description: "We provide leave management portal for BCIIT",
};

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container justify-between items-center flex my-5 min-h-screen">{children}</div>
    </>
  );
}
