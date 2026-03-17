import CreatePoolForm from "@/components/CreatePoolForm";
import { Gift } from "lucide-react";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 flex flex-col items-center p-4 sm:p-6 md:p-12 overflow-y-auto">
      <div className="max-w-2xl w-full text-center space-y-4 mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-900 dark:text-emerald-50 tracking-tight">
          সালামি লিংক তৈরি করুন
        </h1>
        <p className="text-emerald-700 dark:text-emerald-300">
          প্রিয়জনকে সালামি দিন মজার উপায়ে! প্রশ্ন সেট করুন, লিংক শেয়ার করুন, এবং তাদের সালামি অর্জন করতে দিন।
        </p>
      </div>

      <CreatePoolForm />
    </main>
  );
}
