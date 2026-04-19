import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { Upload, Trash2, LogOut, Lock, Image as ImageIcon, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, loginAdmin, logoutAdmin } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin Panel — Photography With Cam" }],
  }),
});

interface PhotoRow {
  id: string;
  name: string;
  category: string;
  storage_path: string;
  url: string;
}

const CATEGORIES = ["Portrait", "Landscape", "Street", "Personal Photography"];

function AdminPage() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        লোড হচ্ছে...
      </div>
    );
  }

  return isAdmin ? <Dashboard /> : <LoginScreen />;
}

/* ───────────────────────── LOGIN ───────────────────────── */

function LoginScreen() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const ok = loginAdmin(password);
    if (!ok) {
      setError("ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।");
      setPassword("");
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-5">
      <div
        className="bg-surface rounded-[22px] p-8 max-w-sm w-full"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-blue/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-blue" />
          </div>
        </div>
        <h1 className="font-heading text-xl font-bold text-foreground text-center mb-1">
          Admin Panel
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-6">
          চালিয়ে যেতে পাসওয়ার্ড দিন
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            required
            autoFocus
            value={password}
            placeholder="পাসওয়ার্ড"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 border-[1.5px] border-border rounded-[12px] text-sm bg-input-bg text-foreground focus:border-blue outline-none transition-all"
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 p-2.5 rounded-[10px] text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-blue text-white py-3 rounded-[12px] font-semibold cursor-pointer disabled:opacity-60 hover:-translate-y-0.5 transition-all"
          >
            {busy ? "..." : "লগইন"}
          </button>
        </form>

        <Link
          to="/"
          className="block text-center mt-4 text-xs text-muted-foreground hover:text-blue transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

/* ───────────────────────── DASHBOARD ───────────────────────── */

function Dashboard() {
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload form state
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Portrait");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("photos")
      .select("id, name, category, storage_path")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage({ type: "err", text: "ছবি লোড করতে সমস্যা: " + error.message });
      setLoading(false);
      return;
    }

    const withUrls = (data || []).map((p) => ({
      ...p,
      url: supabase.storage.from("gallery").getPublicUrl(p.storage_path).data.publicUrl,
    }));
    setPhotos(withUrls);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const setSelectedFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setMessage({ type: "err", text: "শুধু ছবি ফাইল গ্রহণযোগ্য" });
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
    if (!name) setName(f.name.replace(/\.[^.]+$/, ""));
    setMessage(null);
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setName("");
    setCategory("Portrait");
    setProgress(0);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(10);
    setMessage(null);

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      setProgress(30);
      const { error: upErr } = await supabase.storage
        .from("gallery")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;

      setProgress(75);
      const { error: insErr } = await supabase.from("photos").insert({
        name: name.trim() || "Untitled",
        category,
        storage_path: path,
      });
      if (insErr) {
        await supabase.storage.from("gallery").remove([path]);
        throw insErr;
      }

      setProgress(100);
      setMessage({ type: "ok", text: "✅ ছবি যোগ হয়েছে!" });
      resetForm();
      await loadPhotos();
    } catch (e: any) {
      setMessage({ type: "err", text: "❌ আপলোড ব্যর্থ: " + (e.message || "unknown") });
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  const handleDelete = async (photo: PhotoRow) => {
    if (!confirm(`"${photo.name}" মুছে ফেলবেন?`)) return;
    const { error: dbErr } = await supabase.from("photos").delete().eq("id", photo.id);
    if (dbErr) {
      setMessage({ type: "err", text: "❌ ডিলিট ব্যর্থ: " + dbErr.message });
      return;
    }
    await supabase.storage.from("gallery").remove([photo.storage_path]);
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setMessage({ type: "ok", text: "🗑️ ছবি মুছে ফেলা হয়েছে" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">📷</span>
            <h1 className="font-heading text-base sm:text-lg font-bold truncate">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs sm:text-sm text-muted-foreground hover:text-blue transition-colors px-2"
            >
              সাইট দেখুন
            </Link>
            <button
              onClick={() => logoutAdmin()}
              className="flex items-center gap-1.5 bg-filter-bg hover:bg-red-500 hover:text-white text-foreground px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              লগআউট
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-6 sm:py-8 space-y-8">
        {/* Upload card */}
        <section
          className="bg-surface rounded-[18px] p-5 sm:p-6"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <h2 className="font-heading text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue" />
            নতুন ছবি আপলোড
          </h2>

          {/* Drop zone */}
          <div
            className={`border-2 border-dashed rounded-[14px] py-8 px-4 text-center cursor-pointer mb-4 transition-colors ${
              dragging ? "border-blue bg-blue/10" : "border-blue/35 bg-blue/5 hover:bg-blue/10"
            }`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files[0];
              if (f) setSelectedFile(f);
            }}
          >
            <Upload className="w-8 h-8 text-blue opacity-50 mx-auto mb-2" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              ছবি <strong className="text-blue">drag & drop</strong> করুন
              <br />
              অথবা <strong className="text-blue">ক্লিক করে সিলেক্ট</strong> করুন
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
            }}
          />

          {/* Preview */}
          {preview && (
            <div className="mb-4 relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-[280px] object-cover rounded-[12px]"
              />
              <button
                onClick={resetForm}
                disabled={uploading}
                className="absolute top-2 right-2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                aria-label="Remove"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Form */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-foreground">
                ছবির নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: Sunset at Cox's Bazar"
                className="w-full py-2.5 px-3 border-[1.5px] border-border rounded-[10px] text-sm bg-input-bg text-foreground focus:border-blue outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-foreground">
                ক্যাটাগরি
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-2.5 px-3 border-[1.5px] border-border rounded-[10px] text-sm bg-input-bg text-foreground focus:border-blue outline-none transition-all"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="mb-3 bg-filter-bg rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Message */}
          {message && (
            <p
              className={`text-sm p-2.5 rounded-[10px] mb-3 ${
                message.type === "ok"
                  ? "text-green-700 bg-green-500/10 dark:text-green-400"
                  : "text-red-600 bg-red-500/10"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full bg-blue text-white py-3 rounded-[12px] font-semibold cursor-pointer hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {uploading ? `আপলোড হচ্ছে... ${progress}%` : "গ্যালারিতে যোগ করুন"}
          </button>
        </section>

        {/* Photos grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-base sm:text-lg font-bold">
              আপলোড করা ছবি{" "}
              <span className="text-muted-foreground text-sm font-normal">
                ({photos.length})
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground text-sm">লোড হচ্ছে...</div>
          ) : photos.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-surface rounded-[18px]">
              <ImageIcon className="w-10 h-10 opacity-30 mx-auto mb-2" />
              <p className="text-sm">এখনো কোনো ছবি আপলোড হয়নি</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group rounded-[12px] overflow-hidden aspect-square bg-filter-bg"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <p className="text-white text-xs font-medium truncate">{photo.name}</p>
                    <p className="text-white/70 text-[10px]">{photo.category}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(photo)}
                    className="absolute top-1.5 right-1.5 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
