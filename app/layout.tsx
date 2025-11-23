import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout";

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

export default function RootLayout({
  children,
  professor,
  student,
}: Readonly<{
  children: React.ReactNode;
  professor: React.ReactNode;
  student: React.ReactNode;
}>) {
  //TODO:
  const isProfessor = true;

  return (
    <html lang="en">
      <link
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased no-scrollbar`}
      >
        <Layout>
          {isProfessor ? professor : student}
        </Layout>
      </body>
    </html>
  );
}
