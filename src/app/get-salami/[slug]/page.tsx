import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GetSalamiForm from "@/components/GetSalamiForm";
import { Gift } from "lucide-react";

export default async function GetSalamiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pool = await prisma.salamiPool.findUnique({
    where: { slug },
  });

  if (!pool) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-2xl w-full text-center space-y-4 mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-500 p-4 rounded-3xl shadow-xl animate-bounce">
            <Gift className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">
          ঈদ সালামি <span className="text-emerald-600">চ্যালেঞ্জ</span>
        </h1>
        <p className="text-emerald-700 dark:text-emerald-300 font-medium">
          <span className="font-bold underline">{pool.giverName}</span>-এর দেওয়া প্রশ্নের উত্তর দিয়ে সালামি জিতে নিন!
        </p>
      </div>

      {pool.remainingBudget <= 0 ? (
        <div className="bg-white dark:bg-emerald-900 p-8 rounded-3xl shadow-xl border border-emerald-100 dark:border-emerald-800 text-center space-y-4">
          <div className="text-4xl">😢</div>
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-50">পুল খালি!</h2>
          <p className="text-emerald-600 dark:text-emerald-400">
            পরেরবার আবার চেষ্টা করবেন! {pool.giverName} ইতোমধ্যে সব সালামি বিতরণ করে দিয়েছেন।
          </p>
        </div>
      ) : (
        <GetSalamiForm pool={pool} />
      )}
    </main>
  );
}
