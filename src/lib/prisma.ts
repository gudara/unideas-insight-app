// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';

let prisma: PrismaClient;

// Check if Prisma is running in a serverless environment
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development mode, we should reuse the Prisma Client instance
  // to prevent exhausting database connections
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;


export function errorHandler(error: any): {error: string} {
  if (error instanceof PrismaClientKnownRequestError) {
        // Handle known errors such as unique constraint violations
        if (error.code === 'P2002') {
          // P2002 is a unique constraint violation error code
          console.error('Unique constraint violation: ', error.meta);
          return {
            error : `Unique constraint violation: ${error.meta}`
          }
        } else {
          console.error('Prisma error occurred:', error.message);
          return {
            error : `Prisma error occurred: ${error.message}`
          }
        }
      } else if (error instanceof PrismaClientValidationError) {
        // Handle validation errors (such as missing required fields)
        console.error('Validation error occurred:', error.message);
        return {
          error : `Validation error occurred: ${error.message}`
        }
      } else {
        // Catch any other error
        console.error('Unexpected error occurred:', error);
        return {
          error : `Validation error occurred: ${error}`
        }
      }
}
