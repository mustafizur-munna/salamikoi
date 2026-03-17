"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not set in environment variables");
  }

  if (password === adminPassword) {
    // Set a secure cookie that expires in 24 hours
    (await cookies()).set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });
    
    redirect("/master-admin");
  } else {
    throw new Error("ভুল পাসওয়ার্ড");
  }
}

export async function logoutAdmin() {
  (await cookies()).delete("admin_session");
  redirect("/master-admin");
}
