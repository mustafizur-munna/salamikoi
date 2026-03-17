import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Copy, Gift, Users, CreditCard, Share2 } from "lucide-react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

import type { Submission } from "@prisma/client";

export default async function ManagePage({ params }: { params: Promise<{ adminKey: string }> }) {
  const { adminKey } = await params;
  const pool = await prisma.salamiPool.findUnique({
    where: { adminKey },
    include: { submissions: { orderBy: { createdAt: "desc" } } },
  });

  if (!pool) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/get-salami/${pool.slug}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 p-6 md:p-12 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-emerald-900 p-8 rounded-3xl shadow-xl border border-emerald-100 dark:border-emerald-800 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-50 tracking-tight">
              {pool.giverName}-এর সালামি পুল
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium">
              পুল তৈরি হয়েছে {new Date(pool.createdAt).toLocaleDateString('bn-BD')}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-1">
                <CreditCard className="w-4 h-4" /> অবশিষ্ট
              </div>
              <div className="text-2xl font-black text-emerald-900 dark:text-emerald-50">
                ৳{pool.remainingBudget.toLocaleString('bn-BD')}
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-1">
                <Users className="w-4 h-4" /> সালামি গ্রহীতা
              </div>
              <div className="text-2xl font-black text-emerald-900 dark:text-emerald-50">
                {pool.submissions.length.toLocaleString('bn-BD')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 p-8 rounded-3xl shadow-xl text-white space-y-4">
          <div className="flex items-center gap-2 text-emerald-100 font-bold uppercase tracking-wider text-sm">
            <Share2 className="w-4 h-4" /> এই লিংকটি আপনার প্রিয়জনদের সাথে শেয়ার করুন!
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl font-mono text-sm break-all border border-white/20 select-all">
              {shareUrl}
            </div>
            <CopyButton text={shareUrl} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-50 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-500" /> সাম্প্রতিক সালামি গ্রহীতারা
          </h2>
          
          {pool.submissions.length === 0 ? (
            <div className="bg-white/50 dark:bg-emerald-900/50 p-12 rounded-3xl border border-dashed border-emerald-200 dark:border-emerald-800 text-center text-emerald-600 dark:text-emerald-400 font-medium">
              এখনও কেউ সালামি নেয়নি। সালামি দেওয়া শুরু করতে আপনার লিংক শেয়ার করুন!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pool.submissions.map((sub: Submission) => (
                <div key={sub.id} className="bg-white dark:bg-emerald-900 p-6 rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-800 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-50">{sub.getterName}</h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      {new Date(sub.createdAt).toLocaleString('bn-BD')}
                    </p>
                  </div>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
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
