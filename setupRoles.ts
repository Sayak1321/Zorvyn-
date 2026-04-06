import { prisma } from './src/utils/db';
import bcrypt from 'bcrypt';

async function main() {
  console.log('Upgrading admin@finance.app to ADMIN...');
  await prisma.user.updateMany({
    where: { email: 'admin@finance.app' },
    data: { role: 'ADMIN' },
  });

  const passwordHash = await bcrypt.hash('securepass123', 10);

  console.log('Creating analyst@finance.app with ANALYST role...');
  const existingAnalyst = await prisma.user.findUnique({ where: { email: 'analyst@finance.app' } });
  if (!existingAnalyst) {
    await prisma.user.create({
      data: {
        email: 'analyst@finance.app',
        passwordHash,
        role: 'ANALYST',
      },
    });
  }

  console.log('Creating viewer@finance.app with VIEWER role...');
  const existingViewer = await prisma.user.findUnique({ where: { email: 'viewer@finance.app' } });
  if (!existingViewer) {
    await prisma.user.create({
      data: {
        email: 'viewer@finance.app',
        passwordHash,
        role: 'VIEWER',
      },
    });
  }

  console.log('Role setup complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
