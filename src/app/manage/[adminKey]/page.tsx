import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Copy, Gift, Users, CreditCard, Share2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

// Manually define the strict shape instead of importing from Prisma 
// to avoid Vercel build failures when it strips @prisma/client exports
type SubmissionResult = {
  id: string;
  getterName: string;
  amount: number;
  createdAt: Date;
};

export default async function ManagePage({ params }: { params: Promise<{ adminKey: string }> }) {
  const { adminKey } = await params;
  const pool = await prisma.salamiPool.findUnique({
    where: { adminKey },
    include: { submissions: { orderBy: { createdAt: "desc" } } },
  });

  if (!pool) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/get-salami/${pool.slug}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 p-4 sm:p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-emerald-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-100 dark:border-emerald-800 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-900 dark:text-emerald-50 tracking-tight">
              {pool.giverName}-এর সালামি পুল
            </h1>
            <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-medium">
              পুল তৈরি হয়েছে {new Date(pool.createdAt).toLocaleDateString('bn-BD')}
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-3 sm:gap-4">
            <div className="flex-1 bg-emerald-50 dark:bg-emerald-950 p-3 sm:p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold mb-1">
                <CreditCard className="w-4 h-4" /> অবশিষ্ট
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-50">
                ৳{pool.remainingBudget.toLocaleString('bn-BD')}
              </div>
            </div>
            <div className="flex-1 bg-emerald-50 dark:bg-emerald-950 p-3 sm:p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold mb-1">
                <Users className="w-4 h-4" /> গ্রহীতা
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-50">
                {pool.submissions.length.toLocaleString('bn-BD')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/40 p-5 sm:p-6 rounded-2xl border border-amber-200 dark:border-amber-700/50 flex gap-4 mt-6">
          <div className="bg-amber-100 dark:bg-amber-800/50 w-10 h-10 shrink-0 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-amber-700 dark:text-amber-400 text-xs sm:text-sm mt-1 leading-relaxed">
              দয়া করে আপনার <span className="font-bold">বর্তমান ব্রাউজার লিংকের অংশটুকু</span> বুকমার্ক করে রাখুন বা কোথাও সেভ করে রাখুন। এই লিংকটি হারিয়ে গেলে আপনি আর আপনার সালামি প্যানেলে ফিরে আসতে পারবেন না। কে কে সালামি নিলো তা দেখতে মাঝে মাঝে এই পেজটি রিফ্রেশ করুন।
            </p>
          </div>
        </div>

        <div className="bg-emerald-600 p-6 sm:p-8 rounded-3xl shadow-xl text-white space-y-4">
          <div className="flex items-center gap-2 text-emerald-100 font-bold uppercase tracking-wider text-xs sm:text-sm">
            <Share2 className="w-4 h-4 shrink-0" /> এই লিংকটি আপনার প্রিয়জনদের সাথে শেয়ার করুন!
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl font-mono text-sm break-all border border-white/20 select-all">
              {shareUrl}
            </div>
            <CopyButton text={shareUrl} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-50 flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /> সাম্প্রতিক সালামি গ্রহীতারা
          </h2>

          {pool.submissions.length === 0 ? (
            <div className="bg-white/50 dark:bg-emerald-900/50 p-8 sm:p-12 rounded-3xl border border-dashed border-emerald-200 dark:border-emerald-800 text-center text-emerald-600 dark:text-emerald-400 font-medium text-sm sm:text-base">
              এখনও কেউ সালামি নেয়নি। সালামি দেওয়া শুরু করতে আপনার লিংক শেয়ার করুন!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {pool.submissions.map((sub: SubmissionResult) => (
                <div key={sub.id} className="bg-white dark:bg-emerald-900 p-5 sm:p-6 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-800 flex justify-between items-center transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  <div>
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-50 text-base sm:text-lg">{sub.getterName}</h3>
                    <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400">
                      {new Date(sub.createdAt).toLocaleString('bn-BD')}
                    </p>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
                    ৳{sub.amount.toLocaleString('bn-BD')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
