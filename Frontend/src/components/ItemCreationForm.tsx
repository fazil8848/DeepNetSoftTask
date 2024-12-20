import { useState } from "react";
import { MenuItem } from "../types/menu";

interface MenuItemFormProps {
  onAddOrUpdateItem: (item: MenuItem) => void;
  existingItem?: MenuItem;
}

export function ItemCreationForm({
  onAddOrUpdateItem,
  existingItem,
}: MenuItemFormProps) {
  const [name, setName] = useState(existingItem?.name || "");
  const [description, setDescription] = useState(
    existingItem?.description || ""
  );
  const [price, setPrice] = useState(existingItem?.price || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedItem: MenuItem = {
      id: existingItem?.id || Date.now().toString(),
      name,
      description,
      price: price,
    };

    onAddOrUpdateItem(updatedItem);
    setName("");
    setDescription("");
    setPrice(0);
  };

  return (
    <form className="space-y-6 transition-all duration-300 ease-in-out ">
      <div className="flex justify-center items-center gap-4">
        <div className="w-full">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-300"
          >
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#0796EF] focus:ring-[#0796EF] transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="itemPrice"
            className="block text-sm font-medium text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            id="itemPrice"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            step="0.01"
            min="0"
            className="mt-1 p-2 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#0796EF] focus:ring-[#0796EF] transition-all duration-300 ease-in-out"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="itemDescription"
          className="block text-sm font-medium text-gray-300"
        >
          Description
        </label>
        <textarea
          id="itemDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 p-2 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md border border-transparent bg-[#0796EF] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0796EF] focus:ring-offset-2 transition-all duration-300 ease-in-out"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
