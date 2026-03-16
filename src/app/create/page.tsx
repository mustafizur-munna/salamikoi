import CreatePoolForm from "@/components/CreatePoolForm";
import { Gift } from "lucide-react";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 flex flex-col items-center p-6 md:p-12 overflow-y-auto">
      <div className="max-w-2xl w-full text-center space-y-4 mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-50 tracking-tight">
          সালামি পুল তৈরি করুন
        </h1>
        <p className="text-emerald-700 dark:text-emerald-300">
          আপনার বাজেট সেট করুন, কিছু মজার প্রশ্ন যোগ করুন এবং শেয়ার করার জন্য আপনার ইউনিক লিংকটি নিন!
        </p>
      </div>

      <CreatePoolForm />
    </main>
  );
}
