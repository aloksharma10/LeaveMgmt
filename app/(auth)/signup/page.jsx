import Signup from "@/components/Auth/Signup/Signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();
  if (session?.user) {
    return redirect("/user");
  }
  return <Signup />;
}
