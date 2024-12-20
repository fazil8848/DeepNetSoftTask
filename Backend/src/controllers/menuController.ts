import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

const handleError = (res: Response, message: string, error: any) => {
  console.error(error);
  res.status(500).json({ message, error });
};

interface itemType {
  id?: string;
  name: string;
  price: number;
  description: string;
}

export const createMenu = async (req: Request, res: Response) => {
  const { name, description, items } = req.body;

  if (!name || !description || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Name, description, and items are required" });
  }

  console.log(items);

  try {
    const newMenu = await prisma.menu.create({
      data: {
        name,
        description,
      },
    });

    const itemData = items.map((item: itemType) => ({
      name: item.name,
      price: item.price,
      menuId: newMenu.id,
      description: item.description,
    }));

    const savedItems = await prisma.menuItem.createMany({
      data: itemData,
    });

    res.status(201).json({
      menu: newMenu,
      items: savedItems,
    });
  } catch (error) {
    console.error("Error creating menu and items:", error);
    res.status(500).json({ message: "Error creating menu and items" });
  }
};

export const getMenus = async (_req: Request, res: Response) => {
  try {
    const menus = await prisma.menu.findMany();
    res.status(200).json(menus);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleError(res, "Error fetching menus", error.message);
    } else {
      handleError(res, "Error fetching menus", error);
    }
  }
};

export const getMenuById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const menu = await prisma.menu.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json(menu);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleError(res, "Error fetching menu", error.message);
    } else {
      handleError(res, "Error fetching menu", error);
    }
  }
};

export const getMenuItems = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const items = await prisma.menuItem.findMany({
      where: { menuId: id },
    });

    res.status(200).json(items);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleError(res, "Error fetching menu items", error.message);
    } else {
      handleError(res, "Error fetching menu items", error);
    }
  }
};

export const editMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, items } = req.body;

  if (!name || !description || !Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid menu data" });
  }

  try {
    const updatedMenu = await prisma.menu.update({
      where: { id: id },
      data: {
        name,
        description,
      },
    });

    const updatedItems = await Promise.all(
      items.map(async (item: itemType) => {
        if (item.id && ObjectId.isValid(item.id)) {
          return prisma.menuItem.update({
            where: { id: item.id },
            data: {
              name: item.name,
              price: item.price,
              description: item.description,
            },
          });
        } else {
          const { id, ...newItemData } = item;
          return prisma.menuItem.create({
            data: {
              ...newItemData,
              menuId: updatedMenu.id,
            },
          });
        }
      })
    );

    res.status(200).json({ menu: updatedMenu, items: updatedItems });
  } catch (error) {
    console.error("Error editing menu:", error);
    res.status(500).json({ message: "Error editing menu" });
  }
};
