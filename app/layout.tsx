import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout";
import { ModalProvider } from "@/services/modal";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUserWithRole } from "@/lib/user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Verbum",
  description: "language school",
};

export default async function RootLayout({
  children,
  auth,
  professor,
  student,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
  professor: React.ReactNode;
  student: React.ReactNode;
}>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const currUser = await getCurrentUserWithRole()

  return (
    <html lang="en" className="no-scrollbar">
      <link
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased no-scrollbar`}
      >
        <ModalProvider>
          {!user ? auth : (
            <Layout role={currUser?.role || 'student'}>
              {currUser?.role === 'professor' ? professor : student}
            </Layout>
          )}
        </ModalProvider>
      </body>
    </html>
  );
}
