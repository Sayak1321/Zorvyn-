import { RecordRepository } from '../repositories/record.repository';
import { Prisma } from '@prisma/client';

export class RecordService {
  private recordRepository = new RecordRepository();

  async getRecords(filters: any) {
    const whereClause: Prisma.FinancialRecordWhereInput = {};

    if (filters.type) {
      whereClause.type = filters.type;
    }
    if (filters.category) {
      whereClause.category = filters.category;
    }
    if (filters.startDate || filters.endDate) {
      whereClause.date = {};
      if (filters.startDate) whereClause.date.gte = new Date(filters.startDate);
      if (filters.endDate) whereClause.date.lte = new Date(filters.endDate);
    }

    return this.recordRepository.findAll(whereClause);
  }

  async createRecord(userId: string, data: any) {
    return this.recordRepository.create({
      ...data,
      date: new Date(data.date),
      userId,
    });
  }

  async updateRecord(id: string, data: any) {
    const existing = await this.recordRepository.findById(id);
    if (!existing) {
      const err: any = new Error('Record not found');
      err.status = 404;
      throw err;
    }

    const updateData: any = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date);
    }

    return this.recordRepository.update(id, updateData);
  }

  async deleteRecord(id: string) {
    const existing = await this.recordRepository.findById(id);
    if (!existing) {
      const err: any = new Error('Record not found');
      err.status = 404;
      throw err;
    }
    return this.recordRepository.delete(id);
  }
}
