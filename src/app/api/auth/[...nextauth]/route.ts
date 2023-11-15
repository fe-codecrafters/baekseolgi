import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    KakaoProvider({
      // 앱 설정 > 앱 키 > REST API 키
      clientId: process.env.AUTH_KAKAO_ID!,
      // 제품 설정 > 카카오 로그인 > 보안 > Client Secret
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user) {
        return false;
      }

      console.log("singIn", user, account);
      const kakaoId = user.id;
      const duplicate = await prisma.user.findFirst({
        where: {
          UserAuthSocial: {
            socialId: kakaoId,
          },
        },
      });

      if (!duplicate) {
        try {
          await prisma.user.create({
            data: {
              username: user.name!,
              UserAuthSocial: {
                create: {
                  socialId: kakaoId,
                  accessToken: String(account?.access_token),
                  type: "KAKAO",
                },
              },
            },
          });
        } catch (e) {
          console.error(e);
        }
      }

      return true;
    },

    async session({ session, token, user }) {
      return session;
    },
  },
  events: {
    // TODO: bearer 토큰으로 로그아웃 시키는게 바람직, 아직 bearer 토큰 저장 로직이 정해지지 않아서 보류
    async signOut({ token }) {
      try {
        await axios.post(
          "https://kapi.kakao.com/v1/user/logout",
          {
            target_id_type: "user_id",
            target_id: token.sub,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `KakaoAK ${process.env.AUTH_KAKAO_ADMIN_KEY}`,
            },
          },
        );
      } catch (e) {
        console.error("[AUTH] logout event error", e);
      }
      console.log("logout event success");
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
