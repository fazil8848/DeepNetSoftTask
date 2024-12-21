import React, { useState, useEffect } from "react";
import { Menus, MenuItem } from "../types/menu";
import { ItemCreationForm } from "./ItemCreationForm";
import { createMenu, editMenu, getMenuById } from "../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

export function MenuCreationForm() {
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuNameError, setMenuNameError] = useState("");
  const [menuDescriptionError, setMenuDescriptionError] = useState("");
  const [menuItemsError, setMenuItemsError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          setLoading(true);
          const menu = await getMenuById(id);
          console.log(menu);

          setMenuName(menu.name || "");
          setMenuDescription(menu.description || "");
          setMenuItems(menu.menuItems || []);
        } catch (error) {
          console.error("Error fetching menu:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  const validateMenu = () => {
    let isValid = true;

    if (!menuName.trim()) {
      setMenuNameError("Menu name is required.");
      isValid = false;
    } else {
      setMenuNameError("");
    }

    if (!menuDescription.trim()) {
      setMenuDescriptionError("Menu description is required.");
      isValid = false;
    } else {
      setMenuDescriptionError("");
    }

    if (menuItems.length === 0) {
      setMenuItemsError("At least one menu item is required.");
      isValid = false;
    } else {
      const invalidItems = menuItems.some(
        (item) => !item.name || !item.description || item.price <= 0
      );
      if (invalidItems) {
        setMenuItemsError(
          "Each item must have a valid name, description, and price."
        );
        isValid = false;
      } else {
        setMenuItemsError("");
      }
    }

    return isValid;
  };

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

    if (!validateMenu()) return;

    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error saving menu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-10">
          <Loader />
        </div>
      )}
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
              className={`mt-1 block w-full rounded-md p-2 bg-gray-700 text-white shadow-sm border ${
                menuNameError ? "border-red-500" : "border-gray-600"
              } focus:ring-1 focus:ring-offset-1 focus:ring-[#0796EF] transition-all duration-300 ease-in-out`}
            />
            {menuNameError && (
              <p className="text-red-500 text-sm mt-1">{menuNameError}</p>
            )}
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
              className={`mt-1 block w-full rounded-md p-2 bg-gray-700 text-white shadow-sm border ${
                menuDescriptionError ? "border-red-500" : "border-gray-600"
              } focus:ring-1 focus:ring-offset-1 focus:ring-[#0796EF] transition-all duration-300 ease-in-out`}
            />
            {menuDescriptionError && (
              <p className="text-red-500 text-sm mt-1">
                {menuDescriptionError}
              </p>
            )}
          </div>

          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Menu Items
            </h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {menuItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
            {menuItemsError && (
              <p className="text-red-500 text-sm mt-1">{menuItemsError}</p>
            )}
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
    </>
  );
}

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  return (
    <div className="p-4 bg-gray-700 w-[30%] min-w-[250px] rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <h4 className="text-lg font-medium text-white">{item.name}</h4>
      <p className="text-gray-300">{item.description}</p>
      <p className="text-gray-300">Price: ${item.price.toFixed(2)}</p>
    </div>
  );
};
