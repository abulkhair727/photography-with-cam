export function AboutSection() {
  return (
    <section id="about" className="py-[84px] px-5 bg-background transition-colors duration-350 md:px-5">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-[52px] items-center">
          {/* Visual */}
          <div className="relative hidden md:block">
            <div className="rounded-[22px] overflow-hidden aspect-[4/5] bg-blue-light flex items-center justify-center text-[5rem]">
              📷
            </div>
            <div className="absolute -bottom-3.5 -right-3.5 bg-blue text-white rounded-2xl py-3.5 px-5 text-center shadow-[0_8px_26px_rgba(26,110,245,0.4)]">
              <strong className="block text-[1.65rem] font-heading">3+</strong>
              <span className="text-[0.7rem] opacity-85">Years Experience</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="inline-block text-[0.7rem] font-bold tracking-[2px] uppercase text-blue mb-[9px]">Who I Am</span>
            <h2 className="font-heading text-[clamp(1.75rem,4vw,2.55rem)] font-bold text-foreground mb-[11px] leading-[1.15]">About Me</h2>
            <p className="text-muted-foreground leading-[1.82] mb-3.5 text-[0.92rem]">
              Hi, I'm <span className="text-blue font-bold text-[1.04rem]">Abul Khair</span> — a passionate photographer who loves capturing real moments and emotions. Photography is not just my hobby, it's my way of telling stories through images.
              I enjoy capturing natural beauty, people's expressions, and the little details that make every moment special. I specialize in portrait, lifestyle, and creative photography.
              My goal is to create photos that feel alive and meaningful — something you can look back on and feel the moment again. Every photo I take is edited carefully and shared with love. I believe every picture has a story, and I'm here to capture yours.
            </p>
            <div className="grid grid-cols-3 gap-2.5 mt-5">
              {[
                { num: "200+", label: "Photos Taken" },
                { num: "50+", label: "Happy Clients" },
                { num: "3+", label: "Years Active" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-surface rounded-[14px] py-[15px] px-2.5 text-center border-2 border-transparent cursor-pointer hover:border-blue-mid hover:bg-blue-light hover:shadow-[0_0_0_4px_rgba(59,130,246,0.13),0_4px_18px_rgba(26,110,245,0.11)] transition-all"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                  tabIndex={0}
                >
                  <strong className="block font-heading text-[1.55rem] text-blue">{s.num}</strong>
                  <span className="text-[0.7rem] text-muted-foreground font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
