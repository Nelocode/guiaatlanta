const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@laguiaatlanta.com' },
    update: {},
    create: {
      email: 'admin@laguiaatlanta.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Usuario Admin creado:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
