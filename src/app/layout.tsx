import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import TabBar from "@/components/TabBar";
import Providers from "./providers";
import Toast from "@/components/Toast/Toast";
import GlobalModal from "@/components/Modal/GlobalModal";
const DEV = process.env.NODE_ENV === "development";

const inter = Inter({ subsets: ["latin"] });

// const title = "100설기";
// const description = "100일간 목표 달성을 위해 매일매일 기록하세요!";
const url = DEV ? "http://localhost:3000" : "https://100seolgi.click";

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

// export const metadata: Metadata = {
//   title,
//   description,
//   metadataBase: new URL(url),
//   openGraph: {
//     title,
//     description,
//     url,
//     siteName: title,
//     locale: "ko_KR",
//     type: "website",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "w-full h-screen"}>
        {/* <Suspense fallback={<Loading />}> */}
        <Providers>
          <Header />
          <main className="mx-auto flex h-screen w-full flex-col items-center gap-[20px] md:gap-[40px]">
            {children}
            <GlobalModal />
          </main>
          <TabBar />
        </Providers>
        <Toast></Toast>
        {/* </Suspense> */}
      </body>
    </html>
  );
}
