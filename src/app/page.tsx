import Link from "next/link";
import { Gift, Heart, Send } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20">
            <Gift className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-50">
          ঈদ সালামি <span className="text-emerald-600">অ্যাপ</span>
        </h1>
        
        <p className="text-xl text-emerald-700 dark:text-emerald-300">
          প্রিয়জনকে সালামি দিন মজার উপায়ে! প্রশ্ন সেট করুন, লিংক শেয়ার করুন, এবং তাদের সালামি অর্জন করতে দিন।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <Link 
            href="/create"
            className="group relative flex flex-col items-center p-8 bg-white dark:bg-emerald-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-emerald-100 dark:border-emerald-800"
          >
            <div className="bg-emerald-100 dark:bg-emerald-800 p-3 rounded-xl mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Send className="w-6 h-6 text-emerald-600 dark:text-emerald-300 group-hover:text-white" />
            </div>
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-50">সালামি দিন</h2>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
              একটি পুল তৈরি করুন, প্রশ্ন সেট করুন এবং লিংক শেয়ার করুন।
            </p>
          </Link>

          <div className="group relative flex flex-col items-center p-8 bg-white/50 dark:bg-emerald-900/50 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-800 backdrop-blur-sm">
            <div className="bg-emerald-100 dark:bg-emerald-800 p-3 rounded-xl mb-4">
              <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-50 text-opacity-70">সালামি নিন</h2>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 text-opacity-70">
              আপনার বড়দের কাছ থেকে সালামি লিংক চেয়ে নিন!
            </p>
          </div>
        </div>

        <div className="pt-12 text-emerald-600/60 dark:text-emerald-400/40 text-sm font-medium">
          আনন্দ ছড়িয়ে দিন • সালামি শেয়ার করুন • ঈদ মোবারক
        </div>
      </div>
    </main>
  );
}
