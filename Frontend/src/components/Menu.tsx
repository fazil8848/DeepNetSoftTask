import { useEffect, useState } from "react";
import { MenuItem, Menus } from "../types/menu";
import { getMenuItems } from "../services/apiServices";

interface MenuProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  section: Menus;
}

export const Menu = ({ section, setLoading }: MenuProps) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      try {
        if (section.id) {
          const response = await getMenuItems(section.id);
          setItems(response);
        } else {
          console.error("Invalid section ID");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [section]);

  return (
    <div className="p-20">
      <div className="flex justify-center items-center gap-6 mb-8">
        <p className="bg-[#857878] h-1 rounded-sm w-20 mt-1" />
        <h2 className="text-5xl font-oswald font-semibold text-white text-shadow-doubleLayerRed text-center">
          {section.name}
        </h2>
        <p className="bg-[#857878] h-1 rounded-sm w-20 mt-1" />
      </div>
      <div className="flex flex-wrap gap-8 max-h-96 overflow-y-auto scrollbar-hide">
        {items.map((item, index) => (
          <div key={index} className="w-[45%]">
            <div className="flex justify-between text-white text-xl font-oswald">
              <h3>{item.name}</h3>
              <div className="flex-grow mx-1 border-b-4 mb-1 border-dotted border-white"></div>
              <span>${item.price}</span>
            </div>
            <p className="text-gray-400 mt-1 font-kellySlab">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
