import { DefaultSession } from "next-auth";
import { User as PrismaUser } from "@/generated/prisma";

declare module "next-auth" {
  interface Session {
    user: PrismaUser & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends PrismaUser {
    name?: string | null;
  }
}
