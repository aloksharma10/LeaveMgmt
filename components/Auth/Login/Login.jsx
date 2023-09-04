import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../../Logo/Logo";
import AuthSideContainer from "../AuthSideContainer";

export default function Login() {
  return (
    <div className="relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthSideContainer
        title="Login"
        desc="This library has saved me countless hours of work and
          helped me deliver stunning designs to my clients faster than
          ever before."
      />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Welcome Back!
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to login
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full">Login</Button>
              <p className="mt-2 text-xs text-center text-gray-700">
                Dont have an account?
                <Link href="/signup">
                  <span className="text-blue-600">Sign up</span>
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
