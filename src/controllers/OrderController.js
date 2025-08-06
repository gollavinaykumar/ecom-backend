import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOrder = async (req, res, next) => {
  try {
    const { userId, items, total, address } = req.body;
    if (!userId || !items || !total || !address)
      throw new Error("Missing required fields");

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        address,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrdersByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new Error("User ID is required");

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });

    res.json(orders);
  } catch (err) {
    next(err);
  }
};
