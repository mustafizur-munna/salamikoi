"use client";

import { useState } from "react";
import { logoutAdmin } from "@/actions/admin";
import { LogOut, LayoutDashboard, Users, CreditCard } from "lucide-react";

type PoolData = {
  id: string;
  adminKey: string;
  slug: string;
  giverName: string;
  totalBudget: number;
  remainingBudget: number;
  maxPerPerson: number;
  createdAt: Date;
  _count: { submissions: number };
};

type SubmissionData = {
  id: string;
  getterName: string;
  amount: number;
  poolId: string;
  createdAt: Date;
  pool: { giverName: string };
};

export default function AdminDashboard({ 
  pools, 
  submissions 
}: { 
  pools: any[]; 
  submissions: any[]; 
}) {
  const [activeTab, setActiveTab] = useState<"pools" | "submissions">("pools");

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-emerald-900 p-6 rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-3 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight">
                সিস্টেম ড্যাশবোর্ড
              </h1>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Salami App Database View
              </p>
            </div>
          </div>
          <button 
            onClick={() => logoutAdmin()}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" /> লগআউট 
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-emerald-900 p-6 rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-800 flex items-center gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-800 p-4 rounded-full">
              <CreditCard className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Total Pools</p>
              <h2 className="text-3xl font-black text-emerald-900 dark:text-emerald-50">{pools.length}</h2>
            </div>
          </div>
          <div className="bg-white dark:bg-emerald-900 p-6 rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-800 flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">Total Submissions</p>
              <h2 className="text-3xl font-black text-emerald-900 dark:text-emerald-50">{submissions.length}</h2>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white dark:bg-emerald-900 rounded-xl border border-emerald-200 dark:border-emerald-800 w-fit">
          <button 
            onClick={() => setActiveTab("pools")}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
              activeTab === "pools" 
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 dark:shadow-none" 
                : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-800/50"
            }`}
          >
            Salami Pools
          </button>
          <button 
            onClick={() => setActiveTab("submissions")}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
              activeTab === "submissions" 
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 dark:shadow-none" 
                : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-800/50"
            }`}
          >
            Submissions
          </button>
        </div>

        {/* Tables */}
        <div className="bg-white dark:bg-emerald-900 rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-800 overflow-hidden">
          <div className="overflow-x-auto">
            {activeTab === "pools" ? (
              <table className="w-full text-left text-sm text-emerald-800 dark:text-emerald-200">
                <thead className="bg-emerald-50 dark:bg-emerald-950/50 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Giver Name</th>
                    <th className="px-6 py-4">Total Budget</th>
                    <th className="px-6 py-4">Remaining</th>
                    <th className="px-6 py-4">Takers</th>
                    <th className="px-6 py-4">Created Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100 dark:divide-emerald-800">
                  {pools.map((p: PoolData) => (
                    <tr key={p.id} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-800/20 transition-colors">
                      <td className="px-6 py-4 font-bold">{p.giverName}</td>
                      <td className="px-6 py-4">৳{p.totalBudget}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          p.remainingBudget > 0 ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
                        }`}>
                          ৳{p.remainingBudget}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono">{p._count?.submissions || 0}</td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400">
                        {new Date(p.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {pools.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-emerald-500">No pools found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-sm text-emerald-800 dark:text-emerald-200">
                <thead className="bg-emerald-50 dark:bg-emerald-950/50 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Getter Name</th>
                    <th className="px-6 py-4">Amount Won</th>
                    <th className="px-6 py-4">From Pool</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100 dark:divide-emerald-800">
                  {submissions.map((s: SubmissionData) => (
                    <tr key={s.id} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-800/20 transition-colors">
                      <td className="px-6 py-4 font-bold">{s.getterName}</td>
                      <td className="px-6 py-4 font-black text-emerald-600 dark:text-emerald-400">৳{s.amount}</td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400">{s.pool?.giverName}</td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400">
                        {new Date(s.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {submissions.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-emerald-500">No submissions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
