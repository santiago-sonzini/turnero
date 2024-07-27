import HeaderHome from "@/components/layout/header-home";
import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { getUserData } from "./actions/auth";

export const metadata: Metadata = {
  title: "Turnero",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUserData();
  console.log("🚀 ~ user:", user);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable}`}
    >
      {/*  */}
      <body>
        <Analytics />
        <Providers>
          <NextTopLoader color="#27aadd" />
          <Toaster></Toaster>
          <HeaderHome user={user?.status === 200 ? user.data : null} />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
