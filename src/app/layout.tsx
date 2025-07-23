import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fokuslah",
  description: "Boost Your SPM with Fokuslah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body>
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}
