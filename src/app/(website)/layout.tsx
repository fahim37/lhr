// app/layout.tsx
import type { ReactNode } from "react";
import "@/app/globals.css"
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/shared/layout-wrapper";
import AuthProvider from "@/components/session-provide";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Security Monitoring Service",
  description: "24/7 Professional Security Monitoring for Homes & Businesses",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <ToastContainer position="top-right" autoClose={3000} />
          <Toaster position="top-right"/>
        </AuthProvider>
      </body>
    </html>
  );
}
