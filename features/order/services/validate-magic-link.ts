import { prisma } from '@/lib/db/prisma';

export async function validateMagicLink(token: string) {
  const magicLink = await prisma.magicLinkToken.findUnique({
    where: { token },
    include: {
      order: {
        include: {
          customer: true,
          orderItems: {
            include: {
              product: true,
              esim: true,
            },
          },
        },
      },
    },
  });

  if (!magicLink) return null;
  if (magicLink.expiresAt < new Date()) return null;

  if (!magicLink.usedAt) {
    await prisma.magicLinkToken.update({
      where: { id: magicLink.id },
      data: { usedAt: new Date() },
    });
  }

  return magicLink.order;
}
