import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleLike = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) throw new Error("Missing fields for like");

    const existing = await prisma.like.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      return res.json({ message: "Unliked" });
    }

    const like = await prisma.like.create({ data: { userId, productId } });
    res.status(201).json(like);
  } catch (err) {
    next(err);
  }
};
