"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("লিংক কপি করা হয়েছে!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" /> কপি হয়েছে!
        </>
      ) : (
        <>
          <Copy className="w-5 h-5" /> লিংক কপি করুন
        </>
      )}
    </button>
  );
}
