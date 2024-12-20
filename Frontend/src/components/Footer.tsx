import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { GiRotaryPhone } from "react-icons/gi";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <div>
      <footer>
        <div className="bg-black py-12 font-oswald">
          <div className=" mx-auto px-10 md:px-32 grid md:grid-cols-3 gap-8">
            <div className="text-center rounded-xl border py-5">
              <h3 className="text-[#0796EF] mb-4">CONNECT WITH US</h3>
              <div className="flex items-center gap-2 justify-center ">
                <GiRotaryPhone color="#C5A059" />
                <p className="text-[#857878]">+91 9567843340</p>
              </div>
              <div className="flex items-center gap-2 justify-center ">
                <IoMailOutline color="#C5A059" />
                <p className="text-[#857878]">info@deepnetsoft.com</p>
              </div>
            </div>

            <div className=" flex flex-col items-center justify-center relative text-center border rounded-xl p-5">
              <img
                src="/logo.svg"
                alt="Logo"
                className="-top-8 left-[42%] w-16 h-16 absolute"
              />
              <div className="text-5xl">
                <span className="text-[#0796EF]">DEEP</span>
                <span className="text-white">NET</span>
                <span className="text-[#857878]">SOFT</span>
              </div>
              <div className="text-[#857878] flex justify-center gap-4 pt-4">
                <FiFacebook />
                <FiTwitter />
                <FiYoutube />
                <FiInstagram />
              </div>
            </div>

            <div className="text-center rounded-xl border p-5">
              <h3 className="text-[#0796EF] mb-4">FIND US</h3>
              <div className=" flex justify-center">
                <IoLocationOutline color="#0796EF" size={24} />
              </div>
              <p className="text-[#857878]">First floor, Geo infopark,</p>{" "}
              <p className="text-[#857878]">Infopark EXYP, Kakkanad</p>
            </div>
          </div>
        </div>
        <div className="px-10 md:px-32 mx-auto p-4 border-t bg-[#121618] border-gray-800">
          <div className="flex justify-between text-[#857878] text-sm">
            <p>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="hover:text-gray-400">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
