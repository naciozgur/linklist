import { Injectable } from '@nestjs/common';
import { ListVisibility } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DevService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const user = await this.prisma.user.upsert({
      where: { email: 'demo@linklist.local' },
      update: {},
      create: {
        email: 'demo@linklist.local',
        passwordHash: 'development-only-no-login',
        profile: {
          create: {
            username: 'ahmetsirin',
            displayName: 'Ahmet Şirin',
            bio: 'LinkList veri modeli için geliştirme profili.',
          },
        },
      },
    });

    const list = await this.prisma.list.upsert({
      where: { id: '10000000-0000-4000-8000-000000000001' },
      update: {},
      create: {
        id: '10000000-0000-4000-8000-000000000001',
        ownerId: user.id,
        title: 'Yeni ev için',
        description: 'Backend test panelinin örnek listesi.',
        category: 'Ev',
        visibility: ListVisibility.PUBLIC,
      },
    });

    const product = await this.prisma.product.upsert({
      where: { id: '20000000-0000-4000-8000-000000000001' },
      update: {},
      create: {
        id: '20000000-0000-4000-8000-000000000001',
        ownerId: user.id,
        name: 'Opal masa lambası',
        brand: 'H&M HOME',
        price: '1899.00',
        currency: 'TRY',
        sourceUrl: 'https://example.com/products/opal-lamp',
        note: 'Çalışma masasının yanına.',
        savedPriceAt: new Date(),
        images: {
          create: [
            {
              storageKey: 'demo/products/opal-lamp/cover.webp',
              sourceUrl:
                'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
              position: 0,
              width: 1200,
              height: 1500,
              mimeType: 'image/webp',
              altText: 'Opal masa lambası, önden görünüm',
            },
            {
              storageKey: 'demo/products/opal-lamp/detail.webp',
              sourceUrl:
                'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
              position: 1,
              width: 1200,
              height: 800,
              mimeType: 'image/webp',
              altText: 'Opal masa lambası, detay görünümü',
            },
          ],
        },
      },
    });

    await this.prisma.listProduct.upsert({
      where: { listId_productId: { listId: list.id, productId: product.id } },
      update: { position: 0 },
      create: { listId: list.id, productId: product.id, position: 0 },
    });

    return {
      created: true,
      userId: user.id,
      listId: list.id,
      productId: product.id,
    };
  }

  findLists() {
    return this.prisma.list.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        owner: { include: { profile: true } },
        listProducts: {
          orderBy: { position: 'asc' },
          include: {
            product: { include: { images: { orderBy: { position: 'asc' } } } },
          },
        },
      },
    });
  }
}
