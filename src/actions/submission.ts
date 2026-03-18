"use server";

import { prisma, type PrismaTransactionClient } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function submitAnswers(poolId: string, getterName: string, getterAnswers: string[]) {
  const pool = await prisma.salamiPool.findUnique({
    where: { id: poolId },
  });

  if (!pool) throw new Error("Pool not found");

  const questions = JSON.parse(pool.questions);
  let correctCount = 0;

  questions.forEach((q: { answer: string }, index: number) => {
    const getterAnswer = getterAnswers[index]?.toLowerCase().trim();
    const correctAnswer = q.answer.toLowerCase().trim();
    if (getterAnswer === correctAnswer) {
      correctCount++;
    }
  });

  const totalQuestions = questions.length;
  let calculatedAmount = (correctCount / totalQuestions) * pool.maxPerPerson;
  
  // Round to nearest integer to avoid decimals, but do not round to 10s or 20s
  calculatedAmount = Math.round(calculatedAmount);
  
  // Min amount of 10 if they got at least one right? 
  // No, let's just stick to the calculation.
  if (calculatedAmount < 0) calculatedAmount = 0;

  const actualAmount = Math.min(calculatedAmount, pool.remainingBudget);
  const submission = await prisma.$transaction(async (tx: PrismaTransactionClient) => {
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
