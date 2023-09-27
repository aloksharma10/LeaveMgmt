import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import UserProvider from "@/provider/User/UserProvider";
import CustomeLayout from "./CustomeLayout";

export const metadata = {
  title: "Welcome | BCIIT Leave Management Portal",
  description: "We provide leave management portal for BCIIT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomeLayout>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </CustomeLayout>
      </body>
    </html>
  );
}
