import Login from "@/components/Auth/Login/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user.role) {
    return redirect(session?.user.role === "/user" ? "/user" : "/admin");
  }
  return <Login />;
}
