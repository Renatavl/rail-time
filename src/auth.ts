import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as yup from "yup";
import { authService } from "@/server/services/authService";
import { User as PrismaUser, User } from "@/generated/prisma";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

function fullName(
  u: Pick<PrismaUser, "firstName" | "lastName">
): string | null {
  const parts = [u.firstName, u.lastName].filter(Boolean);
  return parts.length ? parts.join(" ") : null;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = await loginSchema
          .validate(
            { email: credentials?.email, password: credentials?.password },
            { abortEarly: false }
          )
          .catch(() => null);

        if (!parsed) return null;

        const user = (await authService.verifyCredentials(
          parsed.email,
          parsed.password
        )) as unknown as User;
        if (!user) return null;

        return {
          id: user.id,
          email: user.email,
          name: fullName(user),
          firstName: user.firstName ?? null,
          lastName: user.lastName ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? null;
        token.name = user.name ?? null;
        token.firstName =
          "firstName" in user ? user.firstName?.toString() ?? "" : "";
        token.lastName =
          "lastName" in user ? user.lastName?.toString() ?? "" : "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email ?? "";
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
