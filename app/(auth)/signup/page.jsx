import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signup from "@/components/Auth/Signup/Signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return redirect(session?.user.role === "staff" || "faculty" ? "/user" : "/admin");
  }
  return <Signup />;
}
