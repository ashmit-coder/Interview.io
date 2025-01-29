import { DefaultSession } from "next-auth";

type Role = "ADMIN" | "MANAGER" | "USER";

declare module "next-auth" {
  interface USER {
    role: Role;
    Username: string;
  }
  interface Session extends DefaultSession {
    user?: USER;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    Username: string;
  }
}
