import { Download, X, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const DISMISS_KEY = "pwa-install-banner-dismissed";

export function InstallBanner() {
  const { canInstall, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(true);
  const [showIOSHelp, setShowIOSHelp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    setDismissed(isDismissed);
  }, []);

  const visible = !isInstalled && !dismissed && (canInstall || isIOS);
  if (!visible) return null;

  const handleClick = async () => {
    if (canInstall) {
      const res = await promptInstall();
      if (res.outcome === "accepted") handleDismiss();
    } else if (isIOS) {
      setShowIOSHelp((s) => !s);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[400] px-3 pt-2 pointer-events-none">
      <div
        className="mx-auto max-w-[640px] pointer-events-auto rounded-[14px] shadow-[0_10px_30px_rgba(26,110,245,0.35)] backdrop-blur-md border border-white/15 flex items-center gap-3 p-2.5 pr-2"
        style={{ background: "linear-gradient(135deg, rgba(26,110,245,0.95), rgba(14,165,233,0.95))" }}
      >
        <div className="w-10 h-10 rounded-[11px] bg-white/20 flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-[0.88rem] leading-tight">
            অ্যাপ হিসেবে ইনস্টল করুন
          </div>
          <div className="text-white/85 text-[0.72rem] mt-0.5 truncate">
            ফোনে অ্যাপ এর মতো চলবে — দ্রুত ও সহজ
          </div>
        </div>
        <button
          onClick={handleClick}
          className="flex items-center gap-1.5 bg-white text-blue font-semibold text-[0.8rem] px-3 py-2 rounded-[10px] hover:bg-white/90 active:scale-95 transition-all flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          ইনস্টল
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Close"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:bg-white/15 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {showIOSHelp && isIOS && (
        <div className="mx-auto max-w-[640px] mt-2 pointer-events-auto p-3 rounded-[12px] bg-blue/95 backdrop-blur-md text-white text-[0.78rem] leading-relaxed shadow-lg">
          <strong>iPhone-এ ইনস্টল করুন:</strong> Safari-তে নিচের <strong>Share</strong> বাটন (⬆️) চাপুন → <strong>"Add to Home Screen"</strong> সিলেক্ট করুন।
        </div>
      )}
    </div>
  );
}
