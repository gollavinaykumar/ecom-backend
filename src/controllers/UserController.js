import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { profile: true } });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET user by ID
export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { profile: true, addresses: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    // First check if user exists
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.user.delete({ where: { id: req.params.id } });

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);

    // Handle Prisma-specific errors (optional)
    if (error.code === "P2025") {
      // Record to delete does not exist
      return res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
