import { prisma } from '../utils/db';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async updateRole(id: string, role: string) {
    return prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async updateStatus(id: string, status: string) {
    return prisma.user.update({
      where: { id },
      data: { status },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }
}
