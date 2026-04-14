import { Camera, Home, Image, User, Briefcase, Mail, X, Plus } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onUploadClick: () => void;
}

const navItems = [
  { href: "#home", icon: Home, label: "Home" },
  { href: "#gallery", icon: Image, label: "Gallery" },
  { href: "#about", icon: User, label: "About" },
  { href: "#services", icon: Briefcase, label: "Services" },
  { href: "#contact", icon: Mail, label: "Contact" },
];

export function Sidebar({ open, onClose, onUploadClick }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[300] backdrop-blur-[4px] transition-opacity duration-350 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "var(--overlay-bg)" }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-[310] w-[285px] bg-sidebar flex flex-col shadow-[4px_0_40px_rgba(0,0,0,0.2)] transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-5 pb-4 border-b border-border flex items-center gap-2.5 relative">
          <div className="w-9 h-9 rounded-[10px] flex-shrink-0 flex items-center justify-center shadow-[0_3px_10px_rgba(26,110,245,0.4)]" style={{ background: "linear-gradient(135deg, #1a6ef5, #0ea5e9)" }}>
            <Camera className="w-[19px] h-[19px] text-white" />
          </div>
          <div className="font-heading text-[0.95rem] font-bold text-foreground leading-tight">
            Photography <span className="text-blue">With Cam</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-3.5 bg-filter-bg border-none cursor-pointer w-[30px] h-[30px] rounded-full flex items-center justify-center text-foreground hover:bg-destructive/15 hover:text-destructive transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Button */}
        <button
          onClick={onUploadClick}
          className="mx-[18px] mt-4 text-white border-none cursor-pointer py-[13px] px-[18px] rounded-[13px] text-[0.91rem] font-semibold font-body w-[calc(100%-36px)] flex items-center justify-center gap-[9px] shadow-[0_4px_18px_rgba(26,110,245,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,110,245,0.45)] transition-all"
          style={{ background: "linear-gradient(135deg, var(--blue), #0ea5e9)" }}
        >
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          ছবি আপলোড করুন
        </button>

        {/* Nav Links */}
        <nav className="px-3 py-1 flex-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setTimeout(onClose, 120)}
              className="flex items-center gap-3 no-underline text-foreground text-[0.91rem] font-medium py-3 px-3 rounded-[11px] mb-0.5 hover:bg-filter-bg hover:text-blue transition-colors"
            >
              <div className="w-[34px] h-[34px] rounded-[9px] bg-filter-bg flex items-center justify-center flex-shrink-0">
                <Icon className="w-[17px] h-[17px] text-blue" />
              </div>
              {label}
            </a>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-border text-[0.75rem] text-muted-foreground">
          © 2025 Photography With Cam · Abul Khair
        </div>
      </div>
    </>
  );
}
