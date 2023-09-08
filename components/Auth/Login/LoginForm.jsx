"use client";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
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
import { userLogin } from "@/actions/userAction";
import { useToast } from "@/components/ui/use-toast";
const LoginForm = () => {
  const formRef = useRef();
  const { toast } = useToast();

  const handleUserLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    if (role && email.includes("@") && password) {
      const { status, token } = await userLogin(formData);
      console.log(status);
      if (status == 400) {
        toast({
          variant: "destructive",
          title: "Your profile is currently in the queue for approval!",
        });
      }
      if (status == 401 || status == 404) {
        toast({
          variant: "destructive",
          title: "Invalid Credentials!",
        });
      }
      if (status == 200) {
        console.log(token);
        toast({
          className: "bg-black text-white",
          title: "Success",
          description: "Your login request has been submitted for approval.",
        });
        formRef.current.reset();
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please enter the valid details!",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleUserLogin}>
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
            <Button className="w-full" type="submit">
              Login
            </Button>
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
