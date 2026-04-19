import { Camera, Home, Image, User, Briefcase, Mail, X, Plus, Download, Smartphone, Check } from "lucide-react";
import { useState } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

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
  const { canInstall, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const [showIOSHelp, setShowIOSHelp] = useState(false);

  const handleInstall = async () => {
    if (isIOS && !isInstalled) {
      setShowIOSHelp(true);
      return;
    }
    if (canInstall) {
      await promptInstall();
    } else {
      setShowIOSHelp(true);
    }
  };

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

        {/* Install App Section */}
        <div className="px-[18px] pb-3 pt-1">
          <button
            onClick={handleInstall}
            disabled={isInstalled}
            className="w-full flex items-center gap-3 py-3 px-3.5 rounded-[13px] border border-border bg-filter-bg/60 hover:bg-filter-bg hover:border-blue/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            <div
              className="w-9 h-9 rounded-[10px] flex-shrink-0 flex items-center justify-center shadow-[0_3px_10px_rgba(26,110,245,0.35)]"
              style={{ background: "linear-gradient(135deg, #1a6ef5, #0ea5e9)" }}
            >
              {isInstalled ? (
                <Check className="w-[18px] h-[18px] text-white" />
              ) : (
                <Download className="w-[17px] h-[17px] text-white" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-[0.88rem] font-semibold text-foreground leading-tight">
                {isInstalled ? "App ইনস্টল হয়েছে" : "App ডাউনলোড করুন"}
              </div>
              <div className="text-[0.7rem] text-muted-foreground mt-0.5 flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                {isInstalled ? "Home screen-এ পাবেন" : "ফোনে অ্যাপ এর মতো চলবে"}
              </div>
            </div>
          </button>

          {showIOSHelp && !isInstalled && (
            <div className="mt-2.5 p-3 rounded-[11px] bg-blue/10 border border-blue/30 text-[0.75rem] text-foreground leading-relaxed">
              {isIOS ? (
                <>
                  <strong className="text-blue">iPhone-এ ইনস্টল করুন:</strong>
                  <br />
                  Safari-তে নিচের <strong>Share</strong> বাটন (⬆️) চাপুন → <strong>"Add to Home Screen"</strong> সিলেক্ট করুন।
                </>
              ) : (
                <>
                  <strong className="text-blue">ইনস্টল করতে:</strong>
                  <br />
                  ব্রাউজার মেনু (⋮) খুলুন → <strong>"Install app"</strong> বা <strong>"Add to Home screen"</strong> সিলেক্ট করুন।
                </>
              )}
              <button
                onClick={() => setShowIOSHelp(false)}
                className="block mt-2 text-blue underline text-[0.72rem]"
              >
                বুঝেছি
              </button>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-border text-[0.75rem] text-muted-foreground">
          © 2025 Photography With Cam · Abul Khair
        </div>
      </div>
    </>
  );
}
