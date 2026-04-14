import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection({ onToast }: { onToast: (msg: string) => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("Portrait Session");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !contact.trim()) {
      onToast("⚠️ নাম ও যোগাযোগ নম্বর দিন");
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
    setName("");
    setContact("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-[84px] px-5 bg-background transition-colors duration-350">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <span className="inline-block text-[0.7rem] font-bold tracking-[2px] uppercase text-blue mb-[9px]">Get in Touch</span>
            <h2 className="font-heading text-[clamp(1.75rem,4vw,2.55rem)] font-bold text-foreground mb-[11px] leading-[1.15]">Contact Me</h2>
            <p className="text-muted-foreground text-[0.93rem] leading-[1.7] max-w-[500px]">আপনার স্বপ্নের সেশন বুক করুন। আমি সবসময় নতুন মুহূর্ত ধারণ করতে প্রস্তুত।</p>

            <div className="flex flex-col gap-2.5 mt-6">
              {[
                { icon: Mail, label: "Email", value: "infokhairofficial@gmail.com" },
                { icon: Phone, label: "Phone", value: "01717865806" },
                { icon: MapPin, label: "Location", value: "Bangladesh" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-surface rounded-[14px] py-[13px] px-[15px] border-2 border-transparent cursor-pointer hover:border-blue-mid hover:bg-blue-light hover:shadow-[0_0_0_4px_rgba(59,130,246,0.11),0_4px_18px_rgba(26,110,245,0.11)] transition-all"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                  tabIndex={0}
                >
                  <div className="w-9 h-9 rounded-[10px] bg-blue/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-[17px] h-[17px] text-blue" />
                  </div>
                  <div>
                    <strong className="block text-[0.74rem] font-semibold text-muted-foreground uppercase tracking-[0.8px]">{item.label}</strong>
                    <span className="text-[0.88rem] text-foreground">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-[22px] p-[30px] transition-colors" style={{ boxShadow: "var(--shadow-md)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px]">
              <div className="mb-3">
                <label className="block text-[0.8rem] font-semibold mb-[5px] text-foreground">আপনার নাম</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full py-2.5 px-[13px] border-[1.5px] border-border rounded-[11px] text-[0.89rem] font-body bg-input-bg text-foreground focus:border-blue focus:shadow-[0_0_0_3px_rgba(26,110,245,0.12)] outline-none transition-all"
                />
              </div>
              <div className="mb-3">
                <label className="block text-[0.8rem] font-semibold mb-[5px] text-foreground">ফোন / ইমেইল</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Phone or Email"
                  className="w-full py-2.5 px-[13px] border-[1.5px] border-border rounded-[11px] text-[0.89rem] font-body bg-input-bg text-foreground focus:border-blue focus:shadow-[0_0_0_3px_rgba(26,110,245,0.12)] outline-none transition-all"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-[0.8rem] font-semibold mb-[5px] text-foreground">সেবার ধরন</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full py-2.5 px-[13px] border-[1.5px] border-border rounded-[11px] text-[0.89rem] font-body bg-input-bg text-foreground focus:border-blue focus:shadow-[0_0_0_3px_rgba(26,110,245,0.12)] outline-none transition-all"
              >
                <option>Portrait Session</option>
                <option>Landscape Photography</option>
                <option>Street Photography</option>
                <option>Personal Photography</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-[0.8rem] font-semibold mb-[5px] text-foreground">বার্তা</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আপনার মেসেজ লিখুন..."
                className="w-full py-2.5 px-[13px] border-[1.5px] border-border rounded-[11px] text-[0.89rem] font-body bg-input-bg text-foreground focus:border-blue focus:shadow-[0_0_0_3px_rgba(26,110,245,0.12)] outline-none transition-all resize-y min-h-[98px]"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue text-white border-none py-3 rounded-[11px] text-[0.92rem] font-semibold font-body shadow-[0_4px_20px_rgba(26,110,245,0.4)] hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(26,110,245,0.5)] transition-all cursor-pointer"
            >
              বার্তা পাঠান →
            </button>
            {success && (
              <div className="bg-green-100 text-green-800 py-2.5 px-3.5 rounded-[11px] text-[0.84rem] font-medium mt-[9px] text-center">
                ✅ আপনার বার্তা পাঠানো হয়েছে! শীঘ্রই যোগাযোগ করা হবে।
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
