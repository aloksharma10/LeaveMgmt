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
  } catch (error) {
    throw new Error("MongoDB not connected", error);
  }
}
export const authOptions = {
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
        const user = await UserSchema.findOne({
          email: credentials.email,
          role: credentials.role,
        })
        if (!user) {
          throw new Error("User not found!");
        }
        if (user.approved == false) {
          throw new Error("waiting for approval!");
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) {
          throw new Error("Invalid Credentials!");
        }
        return user;
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
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
