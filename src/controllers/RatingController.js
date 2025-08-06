import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addRating = async (req, res, next) => {
  try {
    const { userId, productId, rating, comment } = req.body;
    if (!userId || !productId || !rating)
      throw new Error("Missing fields for rating");

    const newRating = await prisma.rating.create({
      data: { userId, productId, rating, comment },
    });

    res.status(201).json(newRating);
  } catch (err) {
    next(err);
  }
};
