import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Heart } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ঈদ সালামি চ্যালেঞ্জ - কে কার চেয়ে বেশি চেনে!",
  description: "বন্ধু বা পরিবারের কে আপনাকে সবচেয়ে ভালো চেনে? কিছু মজার প্রশ্ন সেট করুন, লিংক শেয়ার করুন, আর উত্তরের ভিত্তিতে ওদের সালামি দিন!",
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
          <div className="flex flex-wrap justify-center items-center gap-2 text-rose-800 dark:text-rose-200 font-medium text-sm sm:text-base">
            <span>Made with</span>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 fill-pink-500 animate-pulse drop-shadow-sm" />
            <span>by</span>
            <a
              href="https://facebook.com/munna.mtc.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-400 dark:to-pink-500 hover:scale-105 transition-all duration-300"
            >
              Munna
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-400 dark:to-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
          </div>
        </footer>

        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
