import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaClient } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { axiosErrorHandler } from "../../util/axios";
const prisma = new PrismaClient();

const handler = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const testUser = await prisma.user
          .findUnique({
            where: {
              id: 1,
            },
            include: {
              UserAuthPassword: true,
              UserProfile: true,
            },
          })
          .catch(console.error);

        if (testUser) {
          const res: User = {
            id: String(testUser.id),
            name: testUser?.username,
            email: testUser.UserProfile?.email,
            image: testUser.UserProfile?.imageUrl,
          };

          return res;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
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

      if (account?.type === "credentials") {
        return true;
      } else if (account?.type === "oauth") {
        // TODO: provider가 많아지면 로직 추가 필요
        const kakaoId = user.id;
        let duplicate;
        try {
          duplicate = await prisma.user.findFirst({
            where: {
              UserAuthSocial: {
                socialId: kakaoId,
              },
            },
          });
        } catch (e) {
          console.error(e);
          return false;
        }

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
            return false;
          }
        }
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log("jwt callback", token, account, profile);
      if (token.name === "testUser") {
        return {
          ...token,
          userId: 1,
        };
      }

      const currentUser = await prisma.user
        .findFirstOrThrow({
          where: {
            UserAuthSocial: {
              socialId: token.sub,
            },
          },
          include: {
            Objective: {
              select: {
                id: true,
              },
              where: {
                status: {
                  equals: "ACTIVE",
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        })
        .catch(console.error);

      return {
        ...token,
        userId: currentUser?.id,
        activeObjectiveId:
          currentUser?.Objective.length === 0
            ? undefined
            : Number(currentUser.Objective[0].id),
      };
    },

    async session({ session, token }) {
      console.log("session callback", session, token);
      if (session.user.name === "testUser") {
        return {
          ...session,
          user: {
            ...session.user,
            id: 1,
            activeObjectiveId: 1,
          },
        };
      }

      const currentUser = await prisma.user
        .findFirstOrThrow({
          where: {
            UserAuthSocial: {
              socialId: token.sub,
            },
          },
          include: {
            Objective: {
              select: {
                id: true,
              },
              where: {
                status: {
                  equals: "ACTIVE",
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        })
        .catch(console.error);

      return {
        ...session,
        user: {
          ...session.user,
          id: currentUser?.id,
          kakaoId: Number(token.sub),
          activeObjectiveId:
            currentUser?.Objective.length === 0
              ? undefined
              : Number(currentUser.Objective[0].id),
        },
      };
    },
  },
  events: {
    // TODO: bearer 토큰으로 로그아웃 시키는게 바람직, 아직 bearer 토큰 저장 로직이 정해지지 않아서 보류
    // TODO: (가능한지 모르겠다..) 어떤 provider 유저인지 확인하여 카카오 로그아웃인 경우에만 아래 로직 진행 가능?
    async signOut({ token }) {
      await axios
        .post(
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
        )
        .catch((e) => {
          console.log("[NEXT_AUTH SIGNOUT EVENT ERROR]");
          axiosErrorHandler(e);
        });
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
