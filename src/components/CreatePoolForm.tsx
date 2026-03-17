"use client";

import { useState } from "react";
import { Plus, Trash2, Gift, Save, CheckCircle2, Circle } from "lucide-react";
import { createPool } from "@/actions/pool";
import { cn } from "@/lib/utils";

interface Question {
  text: string;
  options: string[];
  answer: string;
}

const PRESET_QUESTIONS: Question[] = [
  {
    text: "আমি সাধারণত কখন ঘুমাতে যাই?",
    options: ["রাত ১০টা", "রাত ১১টা", "রাত ১২টা", "রাত ১টা"],
    answer: "রাত ১২টা",
  },
  {
    text: "আমার সবচেয়ে প্রিয় খাবার কোনটি?",
    options: ["বিরিয়ানি", "খিচুড়ি", "পিৎজা", "পাস্তা"],
    answer: "বিরিয়ানি",
  },
  {
    text: "আমি কি বেশি কথা বলি নাকি শান্ত থাকি?",
    options: ["কথা বলতে পছন্দ করি", "খুব শান্ত থাকি", "মাঝে মাঝে কথা বলি", "সব সময় কথা বলি"],
    answer: "মাঝে মাঝে কথা বলি",
  },
  {
    text: "আমার প্রিয় শার্টের রং কী?",
    options: ["সাদা", "কালো", "নীল", "লাল"],
    answer: "সাদা",
  },
  {
    text: "আমি কি রান্না করতে পারি?",
    options: ["হ্যাঁ পারি", "একদমই পারি না", "শুধু চা বানাতে পারি", "মাঝে মাঝে চেষ্টা করি"],
    answer: "একদমই পারি না",
  },
  {
    text: "আমি কি বই পড়তে পছন্দ করি?",
    options: ["হ্যাঁ খুব পছন্দ করি", "একদম না", "মাঝে মাঝে পড়ি", "শুধু গল্পের বই পড়ি"],
    answer: "মাঝে মাঝে পড়ি",
  },
  {
    text: "আমার প্রিয় ফল কোনটি?",
    options: ["আম", "কাঁঠাল", "লিচু", "তরমুজ"],
    answer: "আম",
  },
  {
    text: "আমি কি সিনেমা দেখতে পছন্দ করি?",
    options: ["হ্যাঁ পছন্দ করি", "একদম না", "মাঝে মাঝে দেখি", "শুধু কার্টুন দেখি"],
    answer: "মাঝে মাঝে দেখি",
  },
  {
    text: "আমার প্রিয় বাহন কোনটি?",
    options: ["বাস", "ট্রেন", "নৌকা", "বিমান"],
    answer: "ট্রেন",
  },
  {
    text: "আমি কি বৃষ্টি পছন্দ করি?",
    options: ["হ্যাঁ খুব পছন্দ করি", "একদম না", "মাঝে মাঝে ভালো লাগে", "শুধু মেঘলা আকাশ ভালো লাগে"],
    answer: "হ্যাঁ খুব পছন্দ করি",
  },
];

export default function CreatePoolForm() {
  const [questions, setQuestions] = useState<Question[]>([
    { ...PRESET_QUESTIONS[0] },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], answer: "" }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestionText = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    // If the updated option was the correct answer, update the answer string too
    if (newQuestions[qIndex].answer === questions[qIndex].options[oIndex]) {
        newQuestions[qIndex].answer = value;
    }
    setQuestions(newQuestions);
  };

  const setCorrectAnswer = (qIndex: number, option: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answer = option;
    setQuestions(newQuestions);
  };

  const applyPreset = (qIndex: number, presetIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex] = { ...PRESET_QUESTIONS[presetIndex] };
    setQuestions(newQuestions);
  };

  const addOptionField = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const removeOptionField = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    const removedOption = newQuestions[qIndex].options[oIndex];
    newQuestions[qIndex].options.splice(oIndex, 1);
    if (newQuestions[qIndex].answer === removedOption) {
      newQuestions[qIndex].answer = "";
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Basic validation
    const isValid = questions.every(q => q.text && q.answer && q.options.filter(o => o).length >= 2);
    if (!isValid) {
      e.preventDefault();
      alert("দয়া করে প্রতিটি প্রশ্নের সঠিক উত্তর এবং অন্তত ২টি অপশন সেট করুন।");
      return;
    }
    setIsSubmitting(true);
  };

  return (
    <form action={createPool} onSubmit={handleSubmit} className="w-full max-w-3xl space-y-8 pb-12">
      <div className="bg-white dark:bg-emerald-900/50 p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-50 flex items-center gap-2">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /> সাধারণ তথ্য
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">আপনার নাম</label>
            <input 
              required
              name="giverName"
              placeholder="যেমন: Mustafizur Rahman"
              className="w-full p-3 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/30 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">মোট বাজেট (টাকা)</label>
            <input 
              required
              type="number"
              name="totalBudget"
              placeholder="যেমন: ৫০০০"
              className="w-full p-3 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/30 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">প্রত্যেককে সর্বোচ্চ কত সালামি দিবেন?</label>
            <input 
              required
              type="number"
              name="maxPerPerson"
              placeholder="যেমন: ৫০০"
              className="w-full p-3 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/30 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-emerald-900/50 p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-800 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-emerald-100 dark:border-emerald-800 pb-4 gap-4 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-50">প্রশ্নমালা</h2>
            <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 mt-1">যারা আপনাকে সবচেয়ে ভালো জানে, তারা বেশি সালামি পাবে!</p>
          </div>
          <button 
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> নতুন প্রশ্ন
          </button>
        </div>

        <div className="space-y-10">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="relative p-5 sm:p-6 rounded-2xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-6 animate-in fade-in slide-in-from-bottom-2">
              {questions.length > 1 && (
                <button 
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="absolute -top-3 -right-3 p-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-500 bg-emerald-100 dark:bg-emerald-800 px-3 py-1 rounded-full w-fit">
                    প্রশ্ন {qIndex + 1}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <select 
                      onChange={(e) => applyPreset(qIndex, parseInt(e.target.value))}
                      className="text-xs bg-white dark:bg-emerald-800 border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">প্রিসেট প্রশ্ন বেছে নিন...</option>
                      {PRESET_QUESTIONS.map((pq, idx) => (
                        <option key={idx} value={idx}>{pq.text}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <input 
                  required
                  placeholder="আপনার প্রশ্নটি লিখুন"
                  value={q.text}
                  onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                  className="w-full p-2.5 sm:p-3 bg-white dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-base sm:text-lg"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">অপশনগুলো সেট করুন এবং সঠিক উত্তরটি সিলেক্ট করুন:</h3>
                  <button 
                    type="button"
                    onClick={() => addOptionField(qIndex)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> অপশন যোগ করুন
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2 group">
                      <button 
                        type="button"
                        onClick={() => setCorrectAnswer(qIndex, opt)}
                        disabled={!opt}
                        className={cn(
                          "shrink-0 p-1.5 rounded-full transition-all",
                          q.answer === opt && opt !== "" 
                            ? "bg-emerald-500 text-white" 
                            : "bg-emerald-100 dark:bg-emerald-800 text-emerald-300 hover:text-emerald-500"
                        )}
                      >
                        {q.answer === opt && opt !== "" ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      </button>
                      <input 
                        required
                        placeholder={`অপশন ${oIndex + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                        className={cn(
                          "flex-1 p-2.5 text-sm bg-white dark:bg-emerald-900/50 border rounded-xl outline-none transition-all",
                          q.answer === opt && opt !== "" 
                            ? "border-emerald-500 ring-1 ring-emerald-500" 
                            : "border-emerald-200 dark:border-emerald-700"
                        )}
                      />
                      {q.options.length > 2 && (
                        <button 
                          type="button"
                          onClick={() => removeOptionField(qIndex, oIndex)}
                          className="p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <input type="hidden" name="questions" value={JSON.stringify(questions)} />

      <button 
        disabled={isSubmitting}
        type="submit"
        className="w-full py-4 sm:py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-emerald-200 dark:shadow-emerald-900/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            পুল তৈরি হচ্ছে...
          </span>
        ) : (
          <>
            <Save className="w-6 h-6" /> সালামি লিংক তৈরি করুন
          </>
        )}
      </button>
    </form>
  );
}
