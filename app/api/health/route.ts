import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch {
    return Response.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
      },
      { status: 503 },
    );
  }
}
