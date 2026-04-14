import { useState } from "react";
import { Image, X } from "lucide-react";

export interface Photo {
  src: string;
  name: string;
  cat: string;
  id: number;
}

interface GalleryProps {
  photos: Photo[];
  onDelete: (index: number) => void;
  onUploadClick: () => void;
}

const categories = ["All", "Portrait", "Landscape", "Street", "Personal Photography"];

export function GallerySection({ photos, onDelete, onUploadClick }: GalleryProps) {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.cat === filter);

  return (
    <>
      <section id="gallery" className="py-[84px] px-5 bg-surface transition-colors duration-350 md:px-5">
        <div className="max-w-[1080px] mx-auto">
          <div className="flex items-end justify-between mb-[26px] flex-wrap gap-3.5">
            <div>
              <span className="inline-block text-[0.7rem] font-bold tracking-[2px] uppercase text-blue mb-[9px]">📸 My Work</span>
              <h2 className="font-heading text-[clamp(1.75rem,4vw,2.55rem)] font-bold text-foreground leading-[1.15]">Gallery</h2>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`border-none py-[7px] px-[15px] rounded-full text-[0.8rem] font-medium cursor-pointer font-body transition-colors ${
                    filter === cat ? "bg-blue text-white" : "bg-filter-bg text-muted-foreground hover:bg-blue hover:text-white"
                  }`}
                >
                  {cat === "Personal Photography" ? "Personal" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[13px]">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-20 px-5 text-muted-foreground">
                <Image className="w-[54px] h-[54px] opacity-30 mx-auto" />
                <p className="mt-[13px] leading-[1.7]">
                  এখনো কোনো ছবি নেই।<br />☰ মেনু → <strong className="cursor-pointer" onClick={onUploadClick}>ছবি আপলোড করুন</strong>
                </p>
              </div>
            ) : (
              filtered.map((photo) => {
                const globalIndex = photos.indexOf(photo);
                return (
                  <div
                    key={photo.id}
                    className="relative rounded-[14px] overflow-hidden aspect-[4/3] cursor-pointer group hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] transition-all"
                    style={{ boxShadow: "var(--shadow-sm)" }}
                    onClick={() => setLightbox(globalIndex)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.name}
                      loading="lazy"
                      className="w-full h-full object-cover block group-hover:scale-[1.06] transition-transform duration-400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-white text-[0.8rem] font-medium">{photo.name}</span>
                      <span className="bg-blue text-white text-[0.65rem] font-semibold py-[3px] px-2 rounded-full">{photo.cat}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(globalIndex);
                      }}
                      className="absolute top-2 right-2 bg-red-500/90 text-white border-none cursor-pointer w-[27px] h-[27px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-[11px] h-[11px]" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 bg-black/93 flex items-center justify-center z-[600] p-5"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-5 bg-white/15 text-white border-none cursor-pointer w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/28 transition-colors text-lg"
          >
            ✕
          </button>
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].name}
            className="max-w-[90vw] max-h-[85vh] rounded-[11px] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg text-white py-1.5 px-5 rounded-full text-[0.82rem] font-medium whitespace-nowrap">
            {photos[lightbox].name} · {photos[lightbox].cat}
          </div>
        </div>
      )}
    </>
  );
}
