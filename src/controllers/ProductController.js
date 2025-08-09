import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET a single product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { ratings: true, likes: true, comments: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, imageUrl } = req.body;

    // Validate input
    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await prisma.product.create({
      data: { name, description, price, stock, categoryId, imageUrl },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID from route param
    const { name, description, price, stock, categoryId, imageUrl } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name ?? existingProduct.name,
        description: description ?? existingProduct.description,
        price: price ?? existingProduct.price,
        stock: stock ?? existingProduct.stock,
        categoryId: categoryId ?? existingProduct.categoryId,
        imageUrl: imageUrl ?? existingProduct.imageUrl,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
