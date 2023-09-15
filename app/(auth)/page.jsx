import Login from "@/components/Auth/Login/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();
  if (session?.user) {
    return redirect("/user");
  }
  return <Login />;
}
