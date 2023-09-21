import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import UserSchema from "@/lib/models/UserSchema";
import dbConn from "@/lib/db/dbConn";

let conn = false;

async function connect() {
  try {
    await dbConn();
    conn = true;
    console.log("MongoDB connected", conn);
  } catch (error) {
    throw new Error("MongoDB not connected", error);
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        role: { label: "role", type: "text" },
      },
      async authorize(credentials) {
        if (!conn) {
          await connect();
        }
        const userData = await UserSchema.findOne({
          email: credentials.email,
          role: credentials.role,
        });
        if (!userData) {
          throw new Error("User not found!");
        }
        if (userData.approved == false) {
          throw new Error("waiting for approval!");
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          userData.password
        );
        if (!isMatch) {
          throw new Error("Invalid Credentials!");
        }
        return userData;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user._id.toString();
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge:  60 * 60, // 24 hours
  },
});

export { handler as GET, handler as POST };
