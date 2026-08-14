import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/header";
import { RedirectToast } from "@/components/redirect-toast";
import { SideBar } from "@/components/sidebar/components/sidebar";
import { ThemeProvider } from "@/components/themes/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "My road to next application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider>
          <Header />
          <div className="flex h-screen overflow-hidden border-collapse">
            <SideBar />
            <main
              className="
            min-h-screen flex-1
            overflow-y-auto overflow-x-hidden
            py-24 px-8
            bg-secondary/20
            flex flex-col
          "
            >
              {children}
            </main>
          </div>
          <Toaster expand />
          <RedirectToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
