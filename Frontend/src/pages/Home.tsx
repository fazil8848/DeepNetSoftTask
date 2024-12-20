import { useEffect, useState } from "react";
import { Menus } from "../types/menu";
import { Navbar } from "../components/Navbar";
import { MenuTabs } from "../components/MenuTabs";
import { Menu } from "../components/Menu";
import Footer from "../components/Footer";
import { getMenus } from "../services/apiServices";

function Home() {
  const [menus, setMenus] = useState<Menus[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const fetchMenus = async () => {
      const response: Menus[] = await getMenus();

      setMenus(response);
      if (response.length > 0) {
        setActiveTab(response[0].name);
      }
    };

    fetchMenus();
  }, []);

  const activeMenu = menus.find((menu) => menu.name === activeTab);

  return (
    <div className="min-h-screen max-h-fit bg-black bg-opacity-95 transition-all duration-300 ">
      <Navbar activeTab="MENU" />

      <main className="">
        <div className="text-center bg-mainBannerBg flex flex-col items-center justify-center h-[19rem]">
          <h1 className="text-7xl font-oswald font-semibold text-white text-shadow-doubleLayerRed mb-4">
            MENU
          </h1>
          <p className="text-gray-400 max-w-2xl font-kellySlab mx-auto">
            Please take a look at our menu featuring food, drinks, and brunch.
            If you'd like to place an order, use the "Order Online" button
            located below the menu.
          </p>
        </div>

        <MenuTabs
          tabs={menus.map((menu) => menu.name)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          id={activeMenu?.id ?? undefined}
        />

        <div className="relative bg-itemsBg p-10 md:p-32">
          <img
            className="absolute bottom-0 left-0"
            src="/frameLeft.svg"
            alt=""
          />
          <img
            className="absolute bottom-0  right-0"
            src="/frameRight.svg"
            alt=""
          />

          <div className="relative min-h-96 rounded-md border">
            <img
              src="/cocktail2.svg"
              alt="Decorative cocktail"
              className="absolute -left-6 -top-4  md:-left-14 md:-top-40 object-contain h-32 w-32 md:h-auto md:w-auto"
            />
            {activeMenu && <Menu section={activeMenu} />}
            <img
              src="/cocktail1.svg"
              alt="Decorative cocktail"
              className="absolute -right-4 -bottom-0 md:right-0 md:-bottom-9 object-contain h-32 w-32 md:h-auto md:w-auto"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
