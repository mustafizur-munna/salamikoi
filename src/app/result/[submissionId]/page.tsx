import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ResultCard from "@/components/ResultCard";

export default async function ResultPage({ params }: { params: Promise<{ submissionId: string }> }) {
  const { submissionId } = await params;
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: { pool: true },
  });

  if (!submission) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden">
      <div className="max-w-2xl w-full text-center space-y-4 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl sm:text-4xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">
          সালামি <span className="text-emerald-600 underline">পেয়েছেন</span>
        </h1>
        <p className="text-sm sm:text-base text-emerald-700 dark:text-emerald-300 font-medium">
          অভিনন্দন! এখন আপনি আপনার পুরস্কারের একটি স্ক্রিনশট নিতে পারেন।
        </p>
      </div>

      <ResultCard submission={submission} />
    </main>
  );
}
