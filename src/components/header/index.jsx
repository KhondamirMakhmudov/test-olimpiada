import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../language";
import Brand from "../brand";
import { TelegramIcon } from "../icons/social-media/telegram";
import { InstagramIcon } from "../icons/social-media/instagram";
import PhoneIcon from "../icons/social-media/phone";

const navLinks = [
  { href: "/about-us", label: "aboutus" },
  { href: "https://iqmath.uz/", label: "courses" },
  { href: "/faq", label: "faq" },
  { href: "/about-olympics", label: "aboutOlympics" },
];

const Header = ({ color = "white" }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 py-3 bg-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Brand />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          {navLinks.map(({ href, label }) =>
            href.startsWith("http") ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-2 px-3 rounded-md hover:text-[#5d87ff] font-medium uppercase text-sm transition ${
                  router.pathname === href
                    ? "bg-[#3965c6] text-white"
                    : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {t(label)}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className={`py-2 px-3 rounded-md hover:text-[#5d87ff] font-medium uppercase text-sm transition ${
                  router.pathname === href
                    ? "bg-[#3965c6] text-white"
                    : "text-black"
                }`}
              >
                {t(label)}
              </Link>
            )
          )}
        </nav>

        {/* Language & Mobile Menu */}
        <div className="flex items-center">
          <div className="hidden lg:flex gap-x-[10px] items-center">
            <a href="tel: +998 78 888 08 00" className="text-sm">
              <PhoneIcon color={"black"} />
            </a>
            <a href="https://t.me/iqmath2025" target="_blank">
              <TelegramIcon color="black" />
            </a>
            <a href="https://www.instagram.com/iq_mathuz/" target="_blank">
              <InstagramIcon color="black" />
            </a>
          </div>

          <div className="w-[1px] h-[30px] bg-[#E6E5ED] hidden lg:block mx-[10px]"></div>
          <LanguageDropdown />

          {/* Burger Menu Button */}
          <button
            className="ml-4 md:hidden p-2 rounded-md transition hover:bg-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Brand />
          <button onClick={() => setMenuOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col mt-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-3 px-4 text-lg transition ${
                router.pathname === href
                  ? "bg-[#3965c6] text-white"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t(label)}
            </Link>
          ))}
        </nav>

        {/* Social Media Icons in Mobile Menu */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 border-t pt-4">
          <a href="tel: +998 78 888 08 00" className="text-sm">
            <PhoneIcon color="black" />
          </a>
          <a href="https://t.me/iqmath2025" target="_blank">
            <TelegramIcon color="black" />
          </a>
          <a href="https://www.instagram.com/iq_mathuz/" target="_blank">
            <InstagramIcon color="black" />
          </a>
        </div>
      </aside>
    </header>
  );
};

export default Header;
