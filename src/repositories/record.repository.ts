import { prisma } from '../utils/db';
import { Prisma } from '@prisma/client';

export class RecordRepository {
  async findAll(whereClause: Prisma.FinancialRecordWhereInput) {
    return prisma.financialRecord.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
      include: {
        user: { select: { email: true, role: true } },
      },
    });
  }

  async findById(id: string) {
    return prisma.financialRecord.findUnique({ where: { id } });
  }

  async create(data: Prisma.FinancialRecordUncheckedCreateInput) {
    return prisma.financialRecord.create({ data });
  }

  async update(id: string, data: Prisma.FinancialRecordUpdateInput) {
    return prisma.financialRecord.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.financialRecord.delete({ where: { id } });
  }
}
