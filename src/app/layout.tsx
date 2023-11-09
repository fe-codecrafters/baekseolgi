import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TabBar from "@/components/TabBar";
import Providers from "./providers";
import Loading from "./loading";
import { Suspense } from "react";
import Toast from "@/components/Toast/Toast";
import GlobalModal from "@/components/Modal/GlobalModal";
const DEV = process.env.NODE_ENV === "development";

const inter = Inter({ subsets: ["latin"] });

const title = "100설기";
const description = "100일간 목표 달성을 위해 매일매일 기록하세요!";
const url = DEV ? "http://localhost:3000" : "https://100seolgi.click";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "w-full h-screen"}>
        <Providers>
          <Header />
          <main className="mx-auto flex h-screen w-full flex-col items-center gap-[20px] md:gap-[40px]">
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <GlobalModal />
          </main>
          <TabBar />
        </Providers>
        <Toast></Toast>
      </body>
    </html>
  );
}
