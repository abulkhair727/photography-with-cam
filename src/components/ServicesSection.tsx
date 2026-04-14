import { User, Mountain, Newspaper, Heart } from "lucide-react";

const services = [
  {
    icon: User,
    name: "Portrait Session",
    desc: "ব্যক্তিগত বা পারিবারিক পোর্ট্রেট সেশন। প্রাকৃতিক আলোয় সেরা মুহূর্ত ধরে রাখুন।",
    price: "৳1000",
    unit: "/ session",
  },
  {
    icon: Mountain,
    name: "Landscape Photography",
    desc: "প্রকৃতির অপরূপ দৃশ্য ধারণ করুন। ভোরের আলো থেকে সূর্যাস্ত পর্যন্ত।",
    price: "৳1200",
    unit: "/ day",
  },
  {
    icon: Newspaper,
    name: "Street Photography",
    desc: "শহরের প্রাণস্পন্দন ও জীবনের গল্প ক্যামেরায় তুলে আনুন।",
    price: "৳600",
    unit: "/ session",
  },
  {
    icon: Heart,
    name: "Personal Photography",
    desc: "বিশেষ মুহূর্ত, জন্মদিন, বিবাহবার্ষিকী বা যেকোনো ব্যক্তিগত অনুষ্ঠান।",
    price: "৳2500",
    unit: "/ event",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-[84px] px-5 bg-surface transition-colors duration-350">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center max-w-[500px] mx-auto">
          <span className="inline-block text-[0.7rem] font-bold tracking-[2px] uppercase text-blue mb-[9px]">What I Offer</span>
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.55rem)] font-bold text-foreground mb-[11px] leading-[1.15]">Services</h2>
          <p className="text-muted-foreground text-[0.93rem] leading-[1.7]">প্রতিটি মুহূর্তকে অর্থবহ ছবিতে রূপান্তর করি।</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(215px,1fr))] gap-[15px] mt-[38px]">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="rounded-[18px] p-[22px_18px] bg-card border-2 border-transparent cursor-pointer hover:border-blue-mid hover:bg-blue-light hover:shadow-[0_0_0_4px_rgba(59,130,246,0.11),0_6px_26px_rgba(26,110,245,0.12)] hover:-translate-y-1 transition-all"
              style={{ boxShadow: "var(--shadow-sm)" }}
              tabIndex={0}
            >
              <div className="w-[46px] h-[46px] rounded-[13px] mb-[13px] bg-blue/10 flex items-center justify-center">
                <svc.icon className="w-[22px] h-[22px] text-blue" />
              </div>
              <div className="font-heading text-[1.05rem] font-bold mb-[7px] text-foreground">{svc.name}</div>
              <div className="text-muted-foreground text-[0.82rem] leading-[1.62] mb-3.5">{svc.desc}</div>
              <div className="flex items-baseline gap-1">
                <strong className="text-[1.28rem] text-blue font-heading">{svc.price}</strong>
                <span className="text-[0.75rem] text-muted-foreground">{svc.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-[38px]">
          <a
            href="#contact"
            className="bg-blue text-white border-none py-[13px] px-9 rounded-full text-[0.93rem] font-semibold font-body shadow-[0_4px_20px_rgba(26,110,245,0.4)] hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(26,110,245,0.5)] transition-all no-underline inline-block"
          >
            Book a Session
          </a>
        </div>
      </div>
    </section>
  );
}
