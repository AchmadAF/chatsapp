const { PrismaClient, UserRole } = require("../app/generated/prisma");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@chatsapp.local" },
    update: {},
    create: {
      email: "admin@chatsapp.local",
      name: "Admin",
      passwordHash: await hash("admin123", 10),
      role: UserRole.admin,
    },
  });

  await prisma.user.upsert({
    where: { email: "cs@chatsapp.local" },
    update: {},
    create: {
      email: "cs@chatsapp.local",
      name: "Customer Service",
      passwordHash: await hash("cs123456", 10),
      role: UserRole.cs,
    },
  });

  await prisma.whatsappDevice.upsert({
    where: { id: "default" },
    update: { name: "Device Utama", status: "connected" },
    create: { id: "default", name: "Device Utama", status: "connected" },
  });

  const productA = await prisma.product.upsert({
    where: { sku: "SKU-001" },
    update: { name: "Produk Demo", price: 125000, stock: 20, status: "active" },
    create: { name: "Produk Demo", sku: "SKU-001", description: "Produk demo untuk testing order WhatsApp", price: 125000, stock: 20, status: "active", imageUrl: "https://placehold.co/600x400" },
  });

  const productB = await prisma.product.upsert({
    where: { sku: "SKU-002" },
    update: { name: "Paket Hemat", price: 99000, stock: 12, status: "active" },
    create: { name: "Paket Hemat", sku: "SKU-002", description: "Paket hemat buat customer baru", price: 99000, stock: 12, status: "active", imageUrl: "https://placehold.co/600x400" },
  });

  const customer = await prisma.customer.upsert({
    where: { chatJid: "628123456789@s.whatsapp.net" },
    update: { name: "Siti Rahma", phone: "628123456789" },
    create: { name: "Siti Rahma", phone: "628123456789", chatJid: "628123456789@s.whatsapp.net" },
  });

  const chat = await prisma.chat.upsert({
    where: { chatJid_deviceId: { chatJid: customer.chatJid, deviceId: "default" } },
    update: { customerId: customer.id, assignedUserId: admin.id, status: "assigned", lastMessage: "Mau beli paket hemat", unread: 1 },
    create: { chatJid: customer.chatJid, deviceId: "default", customerId: customer.id, assignedUserId: admin.id, status: "assigned", lastMessage: "Mau beli paket hemat", unread: 1, lastInboundAt: new Date() },
  });

  await prisma.message.deleteMany({ where: { chatId: chat.id } });
  await prisma.message.createMany({
    data: [
      { chatId: chat.id, fromMe: false, body: "Halo kak, paket hemat ready?" },
      { chatId: chat.id, fromMe: true, body: "Ready kak, mau dibuatkan invoice?" },
    ],
  });

  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      chatId: chat.id,
      status: "pending_payment",
      subtotal: productB.price,
      total: productB.price,
      items: { create: [{ productId: productB.id, qty: 1, price: productB.price, total: productB.price }] },
      invoice: { create: { paymentUrl: "https://app.sandbox.midtrans.com/snap/v4/redirection/demo" } },
      payments: { create: [{ midtransOrderId: "DEMO-ORDER-001", status: "pending", amount: productB.price }] },
    },
  });

  await prisma.stockMovement.createMany({
    data: [
      { productId: productA.id, type: "in", qty: 20, note: "initial seed" },
      { productId: productB.id, type: "in", qty: 12, note: "initial seed" },
    ],
  });

  await prisma.auditLog.create({ data: { actorId: admin.id, action: "seed", entity: "Order", entityId: order.id } });
}

main()
  .then(() => console.log("Seed SQLite selesai"))
  .finally(async () => {
    await prisma.$disconnect();
  });
