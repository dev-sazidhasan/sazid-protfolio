import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Theme load
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
    { name: "Home", path: "/" },
    { name: "Work", path: "#work" },
    { name: "Skills", path: "#skills" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "#contact" },
  ];

  // Smooth scroll handle
  const handleScroll = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.path.startsWith("#")) {
      
      if (location.pathname !== "/") {
        navigate("/" + item.path);
      } else {
     
        handleScroll(item.path);
        window.history.pushState(null, "", item.path); 
      }
    } else {
     
      navigate(item.path);
    }
  };

  const getIsActive = (item: typeof navItems[0]) => {
    const currentPath = location.pathname;
    const currentHash = location.hash;

    if (item.path === "/") {
      return currentPath === "/" && !currentHash;
    }
    if (item.path.startsWith("#")) {
      return currentPath === "/" && currentHash === item.path;
    }
    return currentPath === item.path;
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
        <Link to="/" className="text-xl font-bold text-black dark:text-white cursor-pointer">
          Sazid Hasan
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const active = getIsActive(item);
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`
                  px-5 py-2 rounded-full
                  text-sm font-medium
                  transition-all duration-300
                  cursor-pointer
                  ${
                    active
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                  }
                `}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Theme Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
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