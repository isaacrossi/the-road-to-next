import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/header";
import { RedirectToast } from "@/components/redirect-toast";
import { AppSideBar } from "@/components/sidebar/components/app-sidebar";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

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
          <SidebarProvider>
            <AppSideBar />
            <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">
              {children}
            </main>
          </SidebarProvider>
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
