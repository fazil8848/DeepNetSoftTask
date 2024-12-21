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
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", description: "", price: "" };

    if (!name.trim()) {
      newErrors.name = "Item name is required.";
      valid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
      valid = false;
    }

    if (price <= 0 || isNaN(price)) {
      newErrors.price = "Price must be a positive number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const updatedItem: MenuItem = {
      id: existingItem?.id || Date.now().toString(),
      name,
      description,
      price,
    };

    onAddOrUpdateItem(updatedItem);
    setName("");
    setDescription("");
    setPrice(0);
    setErrors({ name: "", description: "", price: "" });
  };

  return (
    <form className="space-y-6 transition-all duration-300 ease-in-out">
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
            className={`mt-1 p-2 block w-full rounded-md border ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:ring-[#0796EF]"
            } bg-gray-700 text-white shadow-sm transition-all duration-300 ease-in-out`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
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
            step="0.01"
            min="0"
            className={`mt-1 p-2 block w-full rounded-md border ${
              errors.price
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:ring-[#0796EF]"
            } bg-gray-700 text-white shadow-sm transition-all duration-300 ease-in-out`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
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
          className={`mt-1 p-2 block w-full rounded-md border ${
            errors.description
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:ring-blue-500"
          } bg-gray-700 text-white shadow-sm transition-all duration-300 ease-in-out`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md border border-transparent bg-[#0796EF] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0796EF] focus:ring-offset-2 transition-all duration-300 ease-in-out"
        >
          {existingItem ? "Update Item" : "Add Item"}
        </button>
      </div>
    </form>
  );
}
