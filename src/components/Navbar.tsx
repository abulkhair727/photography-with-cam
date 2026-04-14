import { useState, useEffect } from "react";
import { Camera, Moon, Sun } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
  menuOpen: boolean;
}

export function Navbar({ onMenuToggle, menuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pwc_theme") || "light";
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("pwc_theme", next ? "dark" : "light");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] h-[60px] px-3.5 flex items-center justify-between backdrop-blur-[18px] border-b border-border transition-shadow duration-300`}
      style={{ background: "var(--nav-bg)" }}
    >
      {/* Hamburger */}
      <button
        onClick={onMenuToggle}
        className="w-[38px] h-[38px] rounded-[9px] flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer hover:bg-filter-bg transition-colors flex-shrink-0"
        aria-label="Menu"
      >
        <span
          className={`w-5 h-0.5 rounded bg-foreground transition-all duration-300 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span
          className={`w-5 h-0.5 rounded bg-foreground transition-all duration-300 origin-center ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
        />
        <span
          className={`w-5 h-0.5 rounded bg-foreground transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </button>

      {/* Center Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[calc(100vw-180px)]">
        <div className="w-8 h-8 rounded-[9px] flex-shrink-0 flex items-center justify-center shadow-[0_3px_10px_rgba(26,110,245,0.4)]" style={{ background: "linear-gradient(135deg, #1a6ef5, #0ea5e9)" }}>
          <Camera className="w-[17px] h-[17px] text-white" />
        </div>
        <div className="font-heading font-bold text-foreground whitespace-nowrap leading-none text-[clamp(0.78rem,3.5vw,1rem)]">
          Photography <span className="text-blue">With Cam</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={toggleTheme}
          className="w-[34px] h-[34px] rounded-full border-none cursor-pointer bg-filter-bg text-base flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <a
          href="#contact"
          className="hidden sm:inline-block bg-blue text-white font-semibold text-[0.78rem] py-[7px] px-[13px] rounded-full no-underline whitespace-nowrap shadow-[0_2px_12px_rgba(26,110,245,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(26,110,245,0.4)] transition-all"
        >
          Book Session
        </a>
      </div>
    </nav>
  );
}
