import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { HeroSection } from "@/components/HeroSection";
import { GallerySection } from "@/components/GallerySection";
import { UploadModal } from "@/components/UploadModal";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Toast } from "@/components/Toast";
import { InstallBanner } from "@/components/InstallBanner";
import { useAuth } from "@/hooks/useAuth";

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
  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadClick = () => {
    setSidebarOpen(false);
    if (!isAdmin) {
      setToast("⚠️ ছবি আপলোড করতে /admin এ লগইন করুন");
      return;
    }
    setTimeout(() => setModalOpen(true), 320);
  };

  const handleAdded = () => {
    setModalOpen(false);
    setRefreshKey((k) => k + 1);
    setToast("✅ গ্যালারিতে যোগ হয়েছে!");
    setTimeout(() => {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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
        refreshKey={refreshKey}
        onUploadClick={handleUploadClick}
        onToast={setToast}
      />
      <UploadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={handleAdded}
        onToast={setToast}
      />
      <AboutSection />
      <ServicesSection />
      <ContactSection onToast={setToast} />
      <Footer />
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}
