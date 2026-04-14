import { useState, useRef, useCallback } from "react";
import { Upload } from "lucide-react";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (photo: { src: string; name: string; cat: string }) => void;
}

export function UploadModal({ open, onClose, onAdd }: UploadModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Portrait");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const pendingFile = useRef<File | null>(null);

  const loadFile = useCallback((f: File) => {
    pendingFile.current = f;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
    if (!name) setName(f.name.replace(/\.[^.]+$/, ""));
  }, [name]);

  const handleAdd = () => {
    if (!pendingFile.current || !preview) return;
    onAdd({ src: preview, name: name.trim() || "Untitled", cat });
    setPreview(null);
    setName("");
    setCat("Portrait");
    pendingFile.current = null;
  };

  const handleClose = () => {
    setPreview(null);
    setName("");
    setCat("Portrait");
    pendingFile.current = null;
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[500] backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="bg-surface rounded-[22px] p-[30px] w-[min(480px,95vw)] max-h-[90vh] overflow-y-auto transition-colors"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.3)", animation: "modal-in 0.25s ease" }}
      >
        <h2 className="font-heading text-[1.28rem] font-bold mb-5 text-foreground">📷 ছবি আপলোড করুন</h2>

        <div
          className={`border-2 border-dashed rounded-[14px] py-9 px-4 text-center cursor-pointer mb-[15px] transition-colors ${
            dragging ? "border-blue bg-blue/10" : "border-blue/35 bg-blue/5"
          }`}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f?.type.startsWith("image/")) loadFile(f);
          }}
        >
          <Upload className="w-10 h-10 text-blue opacity-40 mx-auto mb-[9px]" />
          <p className="text-muted-foreground text-[0.84rem] leading-[1.7]">
            ছবি <strong className="text-blue cursor-pointer">drag & drop</strong> করুন<br />
            অথবা <strong className="text-blue cursor-pointer">গ্যালারি / ফাইল সিলেক্ট</strong> করুন
          </p>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) loadFile(e.target.files[0]); }}
        />

        {preview && (
          <img src={preview} alt="" className="w-full h-[155px] object-cover rounded-[11px] mb-[13px]" />
        )}

        <div className="mb-3">
          <label className="block text-[0.8rem] font-semibold mb-[5px] text-foreground">ছবির নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: Beautiful Sunset"
            className="w-full py-2.5 px-[13px] border-[1.5px] border-border rounded-[11px] text-[0.9rem] font-body bg-input-bg text-foreground focus:border-blue focus:shadow-[0_0_0_3px_rgba(26,110,245,0.12)] outline-none transition-all"
          />
        </div>

        <div className="mb-3">
          <label className="block text-[0.8rem] font-semibold mb-[5px] text-foreground">ক্যাটাগরি</label>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full py-2.5 px-[13px] border-[1.5px] border-border rounded-[11px] text-[0.9rem] font-body bg-input-bg text-foreground focus:border-blue focus:shadow-[0_0_0_3px_rgba(26,110,245,0.12)] outline-none transition-all"
          >
            <option value="Portrait">Portrait</option>
            <option value="Landscape">Landscape</option>
            <option value="Street">Street</option>
            <option value="Personal Photography">Personal Photography</option>
          </select>
        </div>

        <div className="flex gap-2.5 mt-1">
          <button
            onClick={handleClose}
            className="flex-1 bg-filter-bg text-foreground border-none cursor-pointer py-[11px] rounded-[11px] text-[0.9rem] font-medium font-body"
          >
            বাতিল
          </button>
          <button
            onClick={handleAdd}
            className="flex-[2] bg-blue text-white border-none cursor-pointer py-[11px] rounded-[11px] text-[0.9rem] font-semibold font-body shadow-[0_4px_16px_rgba(26,110,245,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,110,245,0.4)] transition-all"
          >
            গ্যালারিতে যোগ করুন
          </button>
        </div>
      </div>
    </div>
  );
}
