import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/Factlogo copy.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentPath = window.location.pathname; // Get current page route

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <a href="/">
              <img className="h-15 w-10 mr-2 mb-3 inline-block" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight">{t("app_name")}</span>
            </a>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`relative pb-2 ${
                    currentPath === item.href ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  {t(item.label)}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <select
              onChange={changeLanguage}
              value={i18n.language}
              className="py-2 px-4 border rounded-md bg-neutral-900 text-white"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
            <a
              href="#"
              className="bg-gradient-to-r from-[#0f7de6] to-[#c80f75] py-2 px-3 rounded-md"
            >
              {t("create_account")}
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a
                    href={item.href}
                    className={`${
                      currentPath === item.href ? "border-b-2 border-blue-500" : ""
                    }`}
                  >
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-[#0f7de6] to-[#c80f75]"
              >
                {t("create_account")}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
