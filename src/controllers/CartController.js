import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.params.userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {
        items: {
          create: { productId, quantity },
        },
      },
      create: {
        userId,
        items: { create: { productId, quantity } },
      },
      include: { items: true },
    });

    res.status(201).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
