import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
 
  const [activeSection, setActiveSection] = useState("/");
  
  const isScrollingClick = useRef(false);

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

  
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("/blog");
      return;
    }

    const handleScrollWatcher = () => {
     
      if (isScrollingClick.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const homeEl = document.getElementById("home");
      const workEl = document.getElementById("work");
      const skillsEl = document.getElementById("skills");
      const contactEl = document.getElementById("contact");

      // প্রতিটি সেকশনের শুরু এবং শেষ সীমানা মেপে একটিভ করা হচ্ছে
      if (contactEl && scrollPosition >= contactEl.offsetTop) {
        setActiveSection("#contact");
      } else if (skillsEl && scrollPosition >= skillsEl.offsetTop && scrollPosition < (contactEl?.offsetTop || Infinity)) {
        setActiveSection("#skills");
      } else if (workEl && scrollPosition >= workEl.offsetTop && scrollPosition < (skillsEl?.offsetTop || Infinity)) {
        setActiveSection("#work");
      } else {
        setActiveSection("/");
      }
    };

    window.addEventListener("scroll", handleScrollWatcher, { passive: true });
    handleScrollWatcher(); 

    return () => window.removeEventListener("scroll", handleScrollWatcher);
  }, [location.pathname]);

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
    setIsOpen(false);

  
    setActiveSection(item.path);

    if (item.path.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + item.path);
      } else {
        
        isScrollingClick.current = true;
        handleScroll(item.path);
        window.history.replaceState(null, "", item.path);

        setTimeout(() => {
          isScrollingClick.current = false;
        }, 800); 
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          w-full
          px-6 py-3
          rounded-full
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-black/40
          backdrop-blur-xl
          shadow-xl
        "
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => { setIsOpen(false); setActiveSection("/"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="text-xl font-bold text-black dark:text-white cursor-pointer"
          >
            Sazid Hasan
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = activeSection === item.path;
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

          {/* Right Actions */}
          <div className="flex items-center gap-2">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
              open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
            }}
            className="
              absolute top-16 left-0 right-0
              mt-2 p-4
              rounded-3xl
              border border-black/10 dark:border-white/10
              bg-white/95 dark:bg-black/90
              backdrop-blur-2xl
              shadow-2xl
              md:hidden
              flex flex-col gap-1
            "
          >
            {navItems.map((item) => {
              const active = activeSection === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`
                    w-full px-5 py-3 rounded-2xl
                    text-left text-base font-medium
                    transition-all duration-200
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 