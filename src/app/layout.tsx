import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Builder Senegal",
  description: "Create your professional CV for Senegal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
