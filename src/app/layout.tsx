import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Doctor Appointment and Ambulance Service Online | Sasthya Seba",
  description: "Sasthya Seba is one of the leading online healthcare service providers offering fast and easy doctor appointment booking, telemedicine and ambulance services.",
  keywords: "doctor appointment, ambulance service, healthcare, telemedicine, physiotherapy, health checkup, medical services, Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
