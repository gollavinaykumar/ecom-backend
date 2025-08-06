import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addComment = async (req, res, next) => {
  try {
    const { userId, productId, content } = req.body;
    if (!userId || !productId || !content)
      throw new Error("Missing fields for comment");

    const comment = await prisma.comment.create({
      data: { userId, productId, content },
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
