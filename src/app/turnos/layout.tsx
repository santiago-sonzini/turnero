import HeaderHome from "@/components/layout/header-home";
import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { getUserData } from "../actions/auth";

export const metadata: Metadata = {
  title: "Turnos",
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

  return (
    <>
      <HeaderHome user={user?.status === 200 ? user.data : null} />
      {children}
      {/* <Footer /> */}
    </>
  );
}
