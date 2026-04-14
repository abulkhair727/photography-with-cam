import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  onDone: () => void;
}

export function Toast({ message, onDone }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
    const t = setTimeout(() => {
      setShow(false);
      setTimeout(onDone, 300);
    }, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className={`fixed bottom-[86px] md:bottom-[52px] left-1/2 bg-foreground text-background py-[9px] px-[22px] rounded-full text-[0.82rem] font-medium whitespace-nowrap z-[999] transition-all duration-300 ${
        show ? "opacity-100 -translate-x-1/2 translate-y-0" : "opacity-0 -translate-x-1/2 translate-y-5"
      }`}
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    >
      {message}
    </div>
  );
}
