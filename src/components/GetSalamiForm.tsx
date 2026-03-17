"use client";

import { useState } from "react";
import { Gift, Heart, Send, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { submitAnswers } from "@/actions/submission";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface SalamiPool {
  id: string;
  giverName: string;
  questions: string;
  remainingBudget: number;
}

export default function GetSalamiForm({ pool }: { pool: SalamiPool }) {
  const router = useRouter();
  const questions = JSON.parse(pool.questions) as { text: string; options: string[] }[];
  const [step, setStep] = useState(0); // 0 for name, 1..n for questions
  const [getterName, setGetterName] = useState("");
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (getterName.trim()) setStep(1);
  };

  const selectAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = option;
    setAnswers(newAnswers);
    
    // Auto-advance after a short delay for better UX
    setTimeout(() => {
        if (step < questions.length) {
            setStep(step + 1);
        }
    }, 400);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setStep(0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submissionId = await submitAnswers(pool.id, getterName, answers);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#6ee7b7", "#ffffff"]
      });
      router.push(`/result/${submissionId}`);
    } catch (error) {
      console.error(error);
      alert("কিছু একটা সমস্যা হয়েছে। সম্ভবত পুলটি খালি হয়ে গেছে।");
      setIsSubmitting(false);
    }
  };

  if (step === 0) {
    return (
      <form onSubmit={handleStart} className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white dark:bg-emerald-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-100 dark:border-emerald-800 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-emerald-100 dark:bg-emerald-800 p-4 rounded-full">
              <Heart className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-50">আপনার পরিচয়?</h2>
          <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
            সালামি চ্যালেঞ্জ শুরু করতে {pool.giverName}-কে আপনার নাম বলুন!
          </p>
          <input 
            required
            autoFocus
            value={getterName}
            onChange={(e) => setGetterName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="w-full p-4 rounded-2xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/30 focus:ring-2 focus:ring-emerald-500 outline-none text-center font-bold text-xl"
          />
          <button 
            type="submit"
            disabled={!getterName.trim()}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            চ্যালেঞ্জ শুরু করুন
          </button>
        </div>
      </form>
    );
  }

  const currentQuestion = questions[step - 1];
  const progress = (step / questions.length) * 100;
  const isLastStep = step === questions.length;
  const hasSelectedAnswer = !!answers[step - 1];

  return (
    <div className="w-full max-w-xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-white dark:bg-emerald-900 p-5 sm:p-8 rounded-3xl shadow-xl border border-emerald-100 dark:border-emerald-800 space-y-6 sm:space-y-8 relative overflow-hidden">
        {/* Progress bar at the very top */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-50 dark:bg-emerald-950">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-xs font-black text-emerald-500 uppercase tracking-widest">
            প্রশ্ন {step} / {questions.length}
          </div>
          <div className="w-9" /> {/* Spacer */}
        </div>

        <div className="space-y-6 sm:space-y-8 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-50 leading-tight">
            {currentQuestion.text}
          </h2>
          
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option: string, idx: number) => (
              <button
                key={idx}
                onClick={() => selectAnswer(option)}
                className={cn(
                  "w-full p-3 sm:p-4 rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between group",
                  answers[step - 1] === option 
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40 translate-x-1" 
                    : "bg-white dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/50"
                )}
              >
                <span>{option}</span>
                {answers[step - 1] === option && <CheckCircle2 className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          {isLastStep ? (
            <button 
              disabled={!hasSelectedAnswer || isSubmitting}
              onClick={handleSubmit}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg rounded-2xl shadow-lg transition-all hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "সালামি গণনা করা হচ্ছে..."
              ) : (
                <>চ্যালেঞ্জ শেষ করুন <CheckCircle2 className="w-6 h-6" /></>
              )}
            </button>
          ) : (
            <button 
              disabled={!hasSelectedAnswer}
              onClick={() => setStep(step + 1)}
              className="w-full py-5 bg-emerald-50/50 dark:bg-emerald-800/50 text-emerald-700 dark:text-emerald-300 font-bold rounded-2xl border-2 border-emerald-100 dark:border-emerald-800 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              পরবর্তী প্রশ্ন <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
