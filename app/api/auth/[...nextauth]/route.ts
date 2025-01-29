import { users } from "@/components/dummy";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredenProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredenProvider({
      credentials: {
        username: { type: "text", label: "Username", placeholder: "Username" },
        password: { type: "text", label: "Password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        const findUser = users.find(
          (user) => user.username === credentials?.username
        );
        if (findUser && findUser.password === credentials?.password) {
          const { password, ...other } = findUser;

          return other;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // Default rerun (id,name,picture,email)
      if (token && user) {
        (token.role = user.role), (token.username = user.username);
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
