import { useState, useEffect } from "react";
import { Home, Image, User, Briefcase, Mail } from "lucide-react";

const items = [
  { href: "#home", icon: Home, label: "Home" },
  { href: "#gallery", icon: Image, label: "Gallery" },
  { href: "#about", icon: User, label: "About" },
  { href: "#services", icon: Briefcase, label: "Services" },
  { href: "#contact", icon: Mail, label: "Contact" },
];

export function MobileNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const secs = ["home", "gallery", "about", "services", "contact"];
    const onScroll = () => {
      let act = "home";
      for (const id of secs) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) act = id;
      }
      setActive(act);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[99] border-t border-border py-1.5 pb-4 justify-around items-center flex md:hidden backdrop-blur-[16px]"
      style={{ background: "var(--nav-bg)" }}
    >
      {items.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          className={`flex flex-col items-center gap-0.5 no-underline text-[0.58rem] font-medium min-w-[44px] py-1 transition-colors ${
            active === href.slice(1) ? "text-blue" : "text-muted-foreground hover:text-blue"
          }`}
        >
          <Icon className="w-[22px] h-[22px]" />
          {label}
        </a>
      ))}
    </nav>
  );
}
