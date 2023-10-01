"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef } from "react";
import { useUserProvider } from "@/provider/User/UserProvider";
import SubmitButton from "../SubmitButton";
const SignupForm = () => {
  const formRef = useRef();
  const { handleUserSignup, status } = useUserProvider();
  if (status === true) {
    formRef?.current?.reset();
  }
  return (
    <Card>
      <CardHeader className="space-y-1 w-full">
        <CardTitle className="text-2xl text-center">Welcome!</CardTitle>
        <CardDescription className="text-center">
          BCIIT Leave Management App
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleUserSignup}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="name"
                placeholder="Enter Full Name"
              />
            </div>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="phone"
                placeholder="Enter Your Phone No."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select name="role">
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="role">
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SubmitButton title={"Signup"}/>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
