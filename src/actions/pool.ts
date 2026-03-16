"use server";

import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function createPool(formData: FormData) {
  const giverName = formData.get("giverName") as string;
  const totalBudget = parseFloat(formData.get("totalBudget") as string);
  const maxPerPerson = parseFloat(formData.get("maxPerPerson") as string);
  const questionsJson = formData.get("questions") as string;

  if (!giverName || isNaN(totalBudget) || isNaN(maxPerPerson) || !questionsJson) {
    throw new Error("Invalid form data");
  }

  const slug = nanoid(10);
  const adminKey = nanoid(12);

  await prisma.salamiPool.create({
    data: {
      slug,
      adminKey,
      giverName,
      totalBudget,
      remainingBudget: totalBudget,
      maxPerPerson,
      questions: questionsJson,
    },
  });

  redirect(`/manage/${adminKey}`);
}
