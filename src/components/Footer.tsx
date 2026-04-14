export function Footer() {
  return (
    <footer className="bg-[#080808] text-white/55 py-12 px-5 pb-[108px] md:pb-12">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex justify-between items-start flex-wrap gap-[26px] mb-9">
          <div>
            <div className="font-heading text-[0.97rem] font-bold text-white whitespace-nowrap">
              Photography <em className="text-blue-mid not-italic">With Cam</em>
            </div>
            <p className="text-[0.8rem] leading-[1.7] mt-[9px] max-w-[210px] text-white/40">
              প্রতিটি মুহূর্ত একটি গল্প। আমি সেই গল্পটি ক্যামেরায় ধরে রাখি।
            </p>
            <div className="flex gap-2 mt-3">
              {["✉️", "📞", "f", "📷"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-[34px] h-[34px] rounded-full bg-white/8 text-white/60 flex items-center justify-center text-[0.82rem] hover:bg-blue hover:text-white transition-colors no-underline"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-[0.83rem] font-semibold mb-3">Navigation</h4>
            {["Home", "Gallery", "About", "Services", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block text-white/42 no-underline text-[0.8rem] mb-[7px] hover:text-blue-mid transition-colors">
                {l}
              </a>
            ))}
          </div>

          <div>
            <h4 className="text-white text-[0.83rem] font-semibold mb-3">Services</h4>
            {["Portrait Session", "Landscape", "Street Photography", "Personal Photography"].map((s) => (
              <a key={s} href="#services" className="block text-white/42 no-underline text-[0.8rem] mb-[7px] hover:text-blue-mid transition-colors">
                {s}
              </a>
            ))}
          </div>

          <div>
            <h4 className="text-white text-[0.83rem] font-semibold mb-3">Contact</h4>
            <a href="mailto:infokhairofficial@gmail.com" className="block text-white/42 no-underline text-[0.8rem] mb-[7px] hover:text-blue-mid transition-colors">
              infokhairofficial@gmail.com
            </a>
            <a href="tel:01717865806" className="block text-white/42 no-underline text-[0.8rem] mb-[7px] hover:text-blue-mid transition-colors">
              01717865806
            </a>
          </div>
        </div>

        <div className="border-t border-white/7 pt-5 flex justify-between flex-wrap gap-2 text-[0.75rem] text-white/24">
          <span>© 2026 Photography With Cam. All rights reserved</span>
          <span>by Abul Khair</span>
        </div>
      </div>
    </footer>
  );
}
