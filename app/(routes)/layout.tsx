import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Wblow - admin",
  description: "Wblow admin app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <div className="w-56">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <TopMenu />
        <div className="h-full">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
