import React, { useState, useEffect } from "react";
import { Menus, MenuItem } from "../types/menu";
import { ItemCreationForm } from "./ItemCreationForm";
import { createMenu, editMenu, getMenuById } from "../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";

export function MenuCreationForm() {
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        const menu = await getMenuById(id);
        setMenuName(menu.name);
        setMenuDescription(menu.description);
        setMenuItems(menu.items);
      })();
    }
  }, [id]);

  const handleAddOrUpdateItem = (item: MenuItem) => {
    setMenuItems((prevItems) => {
      const index = prevItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[index] = item;
        return updatedItems;
      }
      return [...prevItems, item];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMenu: Menus = {
      id: id || null,
      name: menuName,
      description: menuDescription,
      items: menuItems,
    };

    if (id) {
      await editMenu(id, updatedMenu);
    } else {
      await createMenu(updatedMenu);
    }

    navigate("/");
  };

  return (
    <div className="mx-auto p-2 md:p-12 bg-mainBannerBg bg-cover rounded-lg shadow-xl transition-all duration-300 ease-in-out max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center md:text-left">
        {id ? "Edit Menu" : "Create New Menu"}
      </h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="menuName"
            className="block text-sm font-medium text-gray-300"
          >
            Menu Name
          </label>
          <input
            type="text"
            id="menuName"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-600 p-2 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
        </div>
        <div>
          <label
            htmlFor="menuDescription"
            className="block text-sm font-medium text-gray-300"
          >
            Menu Description
          </label>
          <textarea
            id="menuDescription"
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.target.value)}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
        </div>

        <div className="border-t border-gray-600 pt-6">
          <h3 className="text-xl font-semibold text-white mb-4">Menu Items</h3>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-700 w-[30%] min-w-[250px] rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <h4 className="text-lg font-medium text-white">{item.name}</h4>
                <p className="text-gray-300">{item.description}</p>
                <p className="text-gray-300">Price: ${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <ItemCreationForm onAddOrUpdateItem={handleAddOrUpdateItem} />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-[#0796EF] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
        >
          {id ? "Update Menu" : "Create Menu"}
        </button>
      </div>
    </div>
  );
}
