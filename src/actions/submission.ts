"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function submitAnswers(poolId: string, getterName: string, getterAnswers: string[]) {
  const pool = await prisma.salamiPool.findUnique({
    where: { id: poolId },
  });

  if (!pool) throw new Error("Pool not found");

  const questions = JSON.parse(pool.questions);
  let correctCount = 0;

  questions.forEach((q: any, index: number) => {
    const getterAnswer = getterAnswers[index]?.toLowerCase().trim();
    const correctAnswer = q.answer.toLowerCase().trim();
    if (getterAnswer === correctAnswer) {
      correctCount++;
    }
  });

  const totalQuestions = questions.length;
  let calculatedAmount = (correctCount / totalQuestions) * pool.maxPerPerson;
  
  // Round to nearest 10 for "realistic" taka amounts
  calculatedAmount = Math.round(calculatedAmount / 10) * 10;
  
  // Min amount of 10 if they got at least one right? 
  // No, let's just stick to the calculation.
  if (calculatedAmount < 0) calculatedAmount = 0;

  // Check budget
  const actualAmount = Math.min(calculatedAmount, pool.remainingBudget);

  const submission = await prisma.$transaction(async (tx) => {
    // 1. Create submission
    const sub = await tx.submission.create({
      data: {
        poolId,
        getterName,
        amount: actualAmount,
        answers: JSON.stringify(getterAnswers),
      },
    });

    // 2. Update pool budget
    await tx.salamiPool.update({
      where: { id: poolId },
      data: {
        remainingBudget: {
          decrement: actualAmount,
        },
      },
    });

    return sub;
  });

  return submission.id;
}
