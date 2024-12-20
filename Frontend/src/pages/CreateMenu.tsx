import Footer from "../components/Footer";
import { MenuCreationForm } from "../components/MenuCreationForm";
import { Navbar } from "../components/Navbar";

function CreateMenu() {
  return (
    <div className="min-h-screen max-h-fit bg-black bg-opacity-95 transition-all duration-300 ">
      <Navbar activeTab="MENU" />

      <main className="px-5 py-10 sm:px-0 sm:py-0  md:p-16 lg:p-24 xl:p-32 bg-itemsBg">
        <MenuCreationForm />
      </main>

      <Footer />
    </div>
  );
}

export default CreateMenu;
