import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        // Si las credenciales no son válidas, retornar null
        if (!parsedCredentials.success) {
          return null;
        }

        // Si las credenciales son válidas, buscar el usuario en la base de datos
        const { email, password } = parsedCredentials.data;

        // Buscar el usuario en la base de datos por correo electrónico
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          return null;
        }

        // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
        if (!bcryptjs.compareSync(password, user.password)) {
          return null;
        }

        // Si las credenciales son válidas, retornar el usuario sin la contraseña
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
