import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { HeroSection } from "@/components/HeroSection";
import { GallerySection, type Photo } from "@/components/GallerySection";
import { UploadModal } from "@/components/UploadModal";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Toast } from "@/components/Toast";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Photography With Cam — Every Moment Tells a Story" },
      { name: "description", content: "Professional photography by Abul Khair. Portrait, landscape, street, and personal photography services in Bangladesh." },
      { property: "og:title", content: "Photography With Cam" },
      { property: "og:description", content: "Real emotions. Real moments. Captured with passion and told through the lens of art." },
    ],
  }),
});

function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("pwc_photos") || "[]");
    } catch {
      return [];
    }
  });

  const savePhotos = useCallback((newPhotos: Photo[]) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem("pwc_photos", JSON.stringify(newPhotos));
    } catch {}
  }, []);

  const handleUploadClick = () => {
    setSidebarOpen(false);
    setTimeout(() => setModalOpen(true), 320);
  };

  const handleAddPhoto = (photo: { src: string; name: string; cat: string }) => {
    const newPhotos = [{ ...photo, id: Date.now() }, ...photos];
    savePhotos(newPhotos);
    setModalOpen(false);
    setToast("✅ গ্যালারিতে যোগ হয়েছে!");
    setTimeout(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeletePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    savePhotos(newPhotos);
    setToast("ছবি মুছে ফেলা হয়েছে");
  };

  return (
    <>
      <Navbar
        onMenuToggle={() => setSidebarOpen((o) => !o)}
        menuOpen={sidebarOpen}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onUploadClick={handleUploadClick}
      />
      <MobileNav />
      <HeroSection />
      <GallerySection
        photos={photos}
        onDelete={handleDeletePhoto}
        onUploadClick={handleUploadClick}
      />
      <UploadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddPhoto}
      />
      <AboutSection />
      <ServicesSection />
      <ContactSection onToast={setToast} />
      <Footer />
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}
