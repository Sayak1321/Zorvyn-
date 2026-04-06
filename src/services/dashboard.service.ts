import { prisma } from '../utils/db';
import { Prisma } from '@prisma/client';

export class DashboardService {
  async getSummary(startDate?: string, endDate?: string) {
    const where: Prisma.FinancialRecordWhereInput = {};
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    const records = await prisma.financialRecord.findMany({
      where,
      select: { amount: true, type: true, category: true },
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals: Record<string, number> = {};

    records.forEach((record) => {
      if (record.type === 'INCOME') totalIncome += record.amount;
      else totalExpense += record.amount;

      categoryTotals[record.category] = (categoryTotals[record.category] || 0) + record.amount;
    });

    return {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryTotals,
    };
  }
}
