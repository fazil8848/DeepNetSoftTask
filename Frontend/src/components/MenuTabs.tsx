import { IoMdAdd } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

interface MenuTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  id?: string;
}

export const MenuTabs = ({
  tabs,
  activeTab,
  onTabChange,
  id,
}: MenuTabsProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="bg-gapBannerBg px-4 py-5 flex justify-center">
      <div
        ref={containerRef}
        className="flex justify-start md:justify-center w-[85%] gap-4 overflow-x-auto scrollbar-hide px-4 scroll-container"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-8 py-3 relative inline-block text-center font-oswald font-medium text-sm md:text-lg border border-[#0796EF] transition-colors duration-300 rounded-sm
              ${
                activeTab === tab
                  ? "bg-[#0796EF] text-white shadow-lg"
                  : "bg-black text-white hover:bg-gray-800"
              }
              `}
          >
            {tab}
            {activeTab === tab && (
              <div
                onClick={() => navigate(`/edit-menu/${id}`)}
                className="absolute -right-1 -top-1"
              >
                <IoSettingsSharp />
              </div>
            )}
          </button>
        ))}
        <button
          onClick={() => navigate("/create-menu")}
          className={`px-8 py-2 flex gap-1 items-center text-center text-[#0796EF] font-oswald text-sm md:text-lg border border-[#0796EF] transition-colors duration-300 rounded-md  hover:bg-[#121618]`}
        >
          <IoMdAdd color="#0796EF" /> ADD
        </button>
      </div>
    </div>
  );
};
