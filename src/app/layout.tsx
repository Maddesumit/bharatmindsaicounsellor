import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RegistrationProvider } from "@/lib/RegistrationContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BharatMinds AI Counsellor - UGCET & UGNEET Admission Guidance",
  description: "AI-powered college counselling for UGCET and UGNEET students. Get expert guidance, cutoff analysis, and personalized college recommendations for Karnataka admissions.",
  keywords: ["UGCET", "UGNEET", "Karnataka admissions", "college counselling", "AI counsellor", "KCET", "engineering admissions", "medical admissions"],
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <RegistrationProvider>
          {children}
        </RegistrationProvider>
      </body>
    </html>
  );
}
