import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin Login — Photography With Cam" }],
  }),
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate({ to: "/" });
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) setError(error.message);
      else setInfo("অ্যাকাউন্ট তৈরি হয়েছে! এখন লগইন করুন। (Admin role পেতে database এ user_roles টেবিলে আপনার user_id সহ 'admin' role যোগ করুন)");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    setBusy(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">লোড হচ্ছে...</div>;
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-5">
        <div className="bg-surface rounded-[22px] p-8 max-w-md w-full text-center" style={{ boxShadow: "var(--shadow-md)" }}>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">⚠️ Admin Access Required</h1>
          <p className="text-muted-foreground mb-2 text-sm">Logged in as: <strong>{user.email}</strong></p>
          <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
            আপনার অ্যাকাউন্টে admin role নেই। Lovable Cloud → Database → user_roles টেবিলে আপনার user_id সহ 'admin' role যোগ করুন।
          </p>
          <p className="text-xs text-muted-foreground mb-5 break-all bg-filter-bg p-2 rounded">User ID: {user.id}</p>
          <button onClick={handleLogout} className="bg-blue text-white py-2.5 px-5 rounded-[11px] font-semibold cursor-pointer">
            লগআউট
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-5">
      <div className="bg-surface rounded-[22px] p-8 max-w-md w-full" style={{ boxShadow: "var(--shadow-md)" }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">📷 Admin {mode === "login" ? "Login" : "Signup"}</h1>
        <p className="text-muted-foreground text-sm mb-6">গ্যালারিতে ছবি আপলোড করতে লগইন করুন</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-foreground">ইমেইল</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 px-3 border-[1.5px] border-border rounded-[11px] text-sm bg-input-bg text-foreground focus:border-blue outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-foreground">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2.5 px-3 border-[1.5px] border-border rounded-[11px] text-sm bg-input-bg text-foreground focus:border-blue outline-none transition-all"
            />
          </div>

          {error && <p className="text-sm text-red-500 bg-red-500/10 p-2.5 rounded-[11px]">{error}</p>}
          {info && <p className="text-sm text-blue bg-blue/10 p-2.5 rounded-[11px]">{info}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-blue text-white py-3 rounded-[11px] font-semibold cursor-pointer disabled:opacity-60 hover:-translate-y-0.5 transition-all"
          >
            {busy ? "অপেক্ষা করুন..." : mode === "login" ? "লগইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); setInfo(null); }}
          className="w-full mt-4 text-sm text-blue underline cursor-pointer bg-transparent border-none"
        >
          {mode === "login" ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন"}
        </button>
      </div>
    </div>
  );
}
