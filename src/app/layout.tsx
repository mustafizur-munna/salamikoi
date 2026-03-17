import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eid Salami App - Share Joy This Eid!",
  description: "A fun way to give and receive Eid Salami with family and friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-emerald-500 selection:text-white flex flex-col min-h-screen`}
      >
        <div className="flex-grow flex flex-col">
          {children}
        </div>

        <footer className="w-full py-6 text-center text-sm text-emerald-700/80 dark:text-emerald-300/80 border-t border-emerald-100 dark:border-emerald-800/50 bg-white/50 dark:bg-emerald-950/50 backdrop-blur-sm mt-auto">
          <p>
            Created with ❤️ by{" "}
            <a
              href="https://facebook.com/munna.mtc.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors underline underline-offset-4"
            >
              Mustafiz Munna
            </a>
          </p>
        </footer>

        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
