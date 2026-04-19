import { useEffect, useState } from "react";

// Simple password-based admin auth (frontend-only, INSECURE by design)
// Password is checked against ADMIN_PASSWORD constant.
// Login state persists in sessionStorage so it clears when browser closes.

export const ADMIN_PASSWORD = "Abulkhair";
const STORAGE_KEY = "pwc_admin_session";

// Module-level event so multiple useAuth() instances stay in sync
const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((fn) => fn());
}

export function loginAdmin(password: string): boolean {
  if (password !== ADMIN_PASSWORD) return false;
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, "1");
    notify();
  }
  return true;
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY);
    notify();
  }
}

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = () => {
      setIsAdmin(sessionStorage.getItem(STORAGE_KEY) === "1");
    };
    check();
    setLoading(false);
    listeners.add(check);
    window.addEventListener("storage", check);
    return () => {
      listeners.delete(check);
      window.removeEventListener("storage", check);
    };
  }, []);

  return { isAdmin, loading };
}
