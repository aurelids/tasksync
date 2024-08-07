import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Opcional: log de queries e informações para debug
});

// Você pode usar esse evento para garantir que a conexão com o banco de dados seja fechada adequadamente quando o processo for encerrado.
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
