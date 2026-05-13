import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // theme load
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navItems = [
    { name: "Home", path: "/portfolio" },
    { name: "Work", path: "#work" },
    { name: "Skills", path: "#skills" },
    { name: "Blog", path: "/" },
    { name: "Contact", path: "#contact" },
  ];

  // smooth scroll
  const handleScroll = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // FIXED ACTIVE LOGIC
  const isActive = (item: any) => {
    const currentPath = location.pathname;
    const currentHash = location.hash;

    if (item.path.startsWith("#")) {
      return currentHash === item.path;
    }

    return currentPath === item.path && !currentHash;
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        fixed top-5 left-1/2 -translate-x-1/2
        w-[92%] max-w-7xl
        px-6 py-3
        rounded-full
        border border-black/10 dark:border-white/10
        bg-white/70 dark:bg-black/40
        backdrop-blur-xl
        shadow-xl
        z-50
      "
    >
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold text-black dark:text-white">
          Sazid Hasan
        </h1>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (item.path.startsWith("#")) {
                  handleScroll(item.path);
                  window.location.hash = item.path;
                }
              }}
            >
              <NavLink
                to={item.path.startsWith("#") ? "/portfolio" : item.path}
                className={() => {
                  const active = isActive(item);

                  return `
                    px-5 py-2 rounded-full
                    text-sm font-medium
                    transition-all duration-300

                    ${
                      active
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                    }
                  `;
                }}
              >
                {item.name}
              </NavLink>
            </button>
          ))}
        </div>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
                <Moon className="w-5 h-5 text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}>
                <Sun className="w-5 h-5 text-orange-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

      </div>
    </motion.nav>
  );
}