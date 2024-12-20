import axios from "axios";
import { Menus } from "../types/menu";

const API = axios.create({
  baseURL: "https://dns.conqod.site/api",
  // baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createMenu = async (menuData: Menus) => {
  try {
    const response = await API.post("/menus", menuData);
    return response.data;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
};

export const getMenus = async () => {
  try {
    const response = await API.get("/menus");
    return response.data;
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

export const getMenuById = async (menuId: string) => {
  try {
    const response = await API.get(`/menus/${menuId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu by ID:", error);
    throw error;
  }
};

export const editMenu = async (menuId: string, menuData: any) => {
  try {
    const response = await API.put(`/menus/${menuId}/items`, menuData);
    return response.data;
  } catch (error) {
    console.error("Error editing menu:", error);
    throw error;
  }
};

export const getMenuItems = async (menuId: string) => {
  try {
    const response = await API.get(`/menus/${menuId}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};
