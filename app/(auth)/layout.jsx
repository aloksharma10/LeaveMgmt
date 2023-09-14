import { getServerSession } from "next-auth";

export default async function AuthLayout({ children }) {
  const session = await getServerSession();
  if (session?.user) {
    
    console.log(session);
  }
  return (
    <div className="container py-5">
      {children}
    </div>
  );
}
