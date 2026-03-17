import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import AdminDashboard from "@/components/AdminDashboard";
import { loginAdmin } from "@/actions/admin";
import { Lock } from "lucide-react";

export default async function MasterAdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-emerald-900 p-8 rounded-3xl shadow-xl border border-emerald-100 dark:border-emerald-800 w-full max-w-md text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-emerald-900 dark:text-emerald-50">মাস্টার অ্যাডমিন</h1>
          <p className="text-emerald-600 dark:text-emerald-400 text-sm">ড্যাশবোর্ড দেখতে পাসওয়ার্ড দিন</p>
          
          <form action={loginAdmin} className="space-y-4">
            <input 
              type="password"
              name="password"
              required
              placeholder="পাসওয়ার্ড"
              className="w-full p-4 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/30 focus:ring-2 focus:ring-emerald-500 outline-none text-center font-bold"
            />
            <button 
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              লগইন
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Fetch all data for the dashboard
  const [pools, submissions] = await Promise.all([
    prisma.salamiPool.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { submissions: true }
        }
      }
    }),
    prisma.submission.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        pool: {
          select: { giverName: true }
        }
      }
    })
  ]);

  return <AdminDashboard pools={pools} submissions={submissions} />;
}
