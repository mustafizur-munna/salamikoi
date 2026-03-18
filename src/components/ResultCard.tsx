"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { Download, Gift, Heart, Send } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Submission {
  id: string;
  getterName: string;
  amount: number;
  pool: {
    giverName: string;
  };
}

export default function ResultCard({ submission }: { submission: Submission }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadScreenshot = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `সালামি-${submission.getterName}-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("স্ক্রিনশট সেভ হয়েছে! আপনার সালামি দাতার সাথে শেয়ার করুন!");
    } catch (err) {
      console.error(err);
      toast.error("স্ক্রিনশট নিতে ব্যর্থ হয়েছে।");
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div
        ref={cardRef}
        className="bg-white dark:bg-emerald-900 p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-emerald-100 dark:border-emerald-800 text-center space-y-6 md:space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-emerald-500" />

        <div className="flex justify-center mb-4">
          <div className="bg-emerald-500 p-5 rounded-full shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20">
            <Gift className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-900 dark:text-emerald-50 uppercase tracking-tighter">
            ঈদ সালামির ফলাফল
          </h2>
          <p className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-[10px] sm:text-sm">
            মোবারক! আপনি {submission.pool.giverName}-এর কাছ থেকে সালামি পেয়েছেন
          </p>
        </div>

        <div className="py-6 sm:py-8 space-y-2">
          <div className="text-emerald-600 dark:text-emerald-400 font-black text-lg sm:text-xl uppercase">৳ টাকা</div>
          <div className="text-6xl sm:text-7xl md:text-8xl font-black text-emerald-500 tracking-tighter tabular-nums drop-shadow-sm">
            {submission.amount.toLocaleString('bn-BD')}
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-100 dark:border-emerald-800">
          <p className="text-emerald-800 dark:text-emerald-200 font-bold italic text-sm sm:text-base">
            &quot;ঈদ মোবারক, {submission.getterName}! আশা করি এটি আপনার মুখে হাসি ফুটাবে।&quot;
          </p>
        </div>

        <div className="pt-4 pb-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
          ঈদ সালামি • ২০২৬
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={downloadScreenshot}
          className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" /> স্ক্রিনশট নিন
        </button>

        <Link
          href="/"
          className="w-full py-5 bg-white/50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-800 text-center transition-all hover:-translate-y-0.5"
        >
          আমিও সালামি দিতে চাই
        </Link>
      </div>
    </div>
  );
}
