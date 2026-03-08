import { PrismaClient, OrderStatus, EsimStatus } from '../lib/db/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { createHash } from 'crypto';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Vendor
  const vendor = await prisma.vendor.create({
    data: {
      name: 'Viettel',
    },
  });
  console.log(`✓ Created vendor: ${vendor.name}`);

  // 2. Create Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Viettel 10GB',
        description: '10GB data plan for 30 days',
        vendorId: vendor.id,
        dataAmountGb: 10,
        validityDays: 30,
        coverage: 'Vietnam',
        priceCents: 999,
        currency: 'USD',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Viettel 20GB',
        description: '20GB data plan for 30 days',
        vendorId: vendor.id,
        dataAmountGb: 20,
        validityDays: 30,
        coverage: 'Vietnam',
        priceCents: 1799,
        currency: 'USD',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Viettel 50GB',
        description: '50GB data plan for 30 days',
        vendorId: vendor.id,
        dataAmountGb: 50,
        validityDays: 30,
        coverage: 'Vietnam',
        priceCents: 3999,
        currency: 'USD',
      },
    }),
  ]);
  console.log(`✓ Created ${products.length} products`);

  // 3. Create Customers
  const customers = await Promise.all(
    Array.from({ length: 5 }, (_, i) =>
      prisma.customer.create({
        data: {
          email: `customer${i + 1}@example.com`,
          name: `Customer ${i + 1}`,
        },
      }),
    ),
  );
  console.log(`✓ Created ${customers.length} customers`);

  // 4. Create Orders (4 orders, each with 1 order item, 1 eSIM, and 1 magic link)
  const orders = await Promise.all(
    Array.from({ length: 4 }, async (_, i) => {
      const customer = customers[i];
      const product = products[i % products.length];

      return prisma.order.create({
        data: {
          orderNumber: `ORD-${String(i + 1).padStart(6, '0')}`,
          customerId: customer.id,
          status: OrderStatus.paid,
          subtotalCents: product.priceCents,
          totalCents: product.priceCents,
          currency: 'USD',
          paidAt: new Date(),
          orderItems: {
            create: {
              productId: product.id,
              quantity: 1,
              unitPriceCents: product.priceCents,
              esim: {
                create: {
                  iccid: `8984012345678901${String(i + 1).padStart(4, '0')}`,
                  qrCodeData: `LPA:1$smdp.example.com$ACTIVATION_CODE_${i + 1}`,
                  activationCode: `ACT-${String(i + 1).padStart(8, '0')}`,
                  smdpAddress: 'smdp.example.com',
                  status: EsimStatus.active,
                  activatedAt: new Date(),
                  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                },
              },
            },
          },
          magicLinkTokens: {
            create: {
              token: `magic_${crypto.randomUUID().replace(/-/g, '')}`,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            },
          },
        },
        include: {
          orderItems: {
            include: {
              esim: true,
            },
          },
          magicLinkTokens: true,
        },
      });
    }),
  );
  console.log(`✓ Created ${orders.length} orders with order items, eSIMs, and magic links`);

  // 4b. Create an additional order with a deterministic magic link token for e2e tests
  const e2eOrder = await prisma.order.create({
    data: {
      orderNumber: 'ORD-E2E-001',
      customerId: customers[4].id,
      status: OrderStatus.paid,
      subtotalCents: products[0].priceCents,
      totalCents: products[0].priceCents,
      currency: 'USD',
      paidAt: new Date(),
      orderItems: {
        create: {
          productId: products[0].id,
          quantity: 1,
          unitPriceCents: products[0].priceCents,
          esim: {
            create: {
              iccid: '89840123456789019999',
              qrCodeData: 'LPA:1$smdp.example.com$ACTIVATION_CODE_E2E',
              activationCode: 'ACT-E2E-0001',
              smdpAddress: 'smdp.example.com',
              status: EsimStatus.active,
              activatedAt: new Date(),
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
      },
      magicLinkTokens: {
        create: {
          token: 'e2e-test-token',
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        },
      },
    },
  });
  console.log(`✓ Created e2e test order: ${e2eOrder.orderNumber}`);

  // 5. Create Admin User
  const adminUser = await prisma.adminUser.create({
    data: {
      email: 'admin@esim.com',
      name: 'Admin',
      passwordHash: hashPassword('admin123'),
      isActive: true,
    },
  });
  console.log(`✓ Created admin user: ${adminUser.email}`);

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
