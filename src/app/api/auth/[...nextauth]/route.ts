import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async signIn({ user, account }) {
      // const duplicate = await prisma.user.findFirst({
      //   where: { email: user.email! },
      // });

      // if (!duplicate) {
      //   try {
      //     await prisma.user.create({
      //       data: {
      //         email: user.email!,
      //         profile: user?.image!,
      //         username: user.name!,
      //         id: account?.providerAccountId,
      //       },
      //     });
      //   } catch (e) {
      //     console.error(e);
      //   }
      //   return true;
      // }

      return true;
    },

    async session({ session, token }) {
      console.log(session, token);
      session.user = token as any;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
