import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateProfile = async (req, res, next) => {
  try {
    const { userId, bio, avatarUrl } = req.body;
    if (!userId) throw new Error("User ID is required");

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: { bio, avatarUrl },
      create: { userId, bio, avatarUrl },
    });

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

export const addAddress = async (req, res, next) => {
  try {
    const { userId, line1, city, state, country, pincode } = req.body;
    if (!userId || !line1 || !city || !state || !country || !pincode)
      throw new Error("Incomplete address details");

    const address = await prisma.address.create({
      data: {
        userId,
        line1,
        line2: req.body.line2 || "",
        city,
        state,
        country,
        pincode,
        isDefault: req.body.isDefault || false,
      },
    });

    res.status(201).json(address);
  } catch (err) {
    next(err);
  }
};
