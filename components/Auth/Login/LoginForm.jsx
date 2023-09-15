"use client"
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserProvider } from "@/provider/User/UserProvider";
import SubmitButton from "../SubmitButton";
const LoginForm = () => {
  const { handleUserLogin } = useUserProvider();
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleUserLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="company@domain.com"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select name="role">
                <SelectTrigger id="role">
                  <SelectValue
                    defaultValue=""
                    defaultChecked
                    placeholder="Select"
                  />
                </SelectTrigger>
                <SelectContent position="role">
                  <SelectItem value="">Select</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SubmitButton title={"Login"} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="mt-2 text-xs text-center text-gray-700">
          Dont have an account?
          <Link href="/signup">
            <span className="text-blue-600"> Sign up</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
