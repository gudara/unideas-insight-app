import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;  // Use `undefined` to allow for initialization check
}

export {};
