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

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
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
