import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-5 pt-[90px] pb-[130px] relative overflow-hidden"
    >
      {/* Nature SVG Background */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <defs>
            <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a2a6e" />
              <stop offset="30%" stopColor="#1a56c4" />
              <stop offset="60%" stopColor="#4a90d9" />
              <stop offset="100%" stopColor="#8bbfe8" />
            </linearGradient>
            <radialGradient id="sunG" cx="72%" cy="18%" r="14%">
              <stop offset="0%" stopColor="#fff7c0" stopOpacity="1" />
              <stop offset="45%" stopColor="#ffd060" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffd060" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="mtn1G" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3f7a" /><stop offset="100%" stopColor="#0d2248" /></linearGradient>
            <linearGradient id="mtn2G" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3468a8" /><stop offset="100%" stopColor="#1a3c6a" /></linearGradient>
            <linearGradient id="mtn3G" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a8ec0" /><stop offset="100%" stopColor="#2e5a90" /></linearGradient>
            <linearGradient id="frstG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#145220" /><stop offset="100%" stopColor="#082812" /></linearGradient>
            <linearGradient id="lakeG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a4a90" /><stop offset="100%" stopColor="#0a2450" /></linearGradient>
            <linearGradient id="snowG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#cce0f8" /></linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="softBlur"><feGaussianBlur stdDeviation="2.5" /></filter>
          </defs>
          <rect width="1440" height="900" fill="url(#skyG)" />
          <circle cx="1037" cy="162" r="52" fill="#fff5b0" opacity="0.18" />
          <circle cx="1037" cy="162" r="34" fill="#ffe878" opacity="0.55" />
          <circle cx="1037" cy="162" r="18" fill="#fff8d6" opacity="0.95" filter="url(#glow)" />
          <ellipse cx="1037" cy="162" rx="140" ry="80" fill="url(#sunG)" opacity="0.6" />
          <circle cx="1037" cy="162" r="24" fill="none" stroke="#fff8b0" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
          <g opacity="0.65" fill="#fff">
            <circle cx="90" cy="55" r="1.4" /><circle cx="210" cy="38" r="1" /><circle cx="350" cy="72" r="1.3" />
            <circle cx="490" cy="28" r="1" /><circle cx="620" cy="64" r="1.5" /><circle cx="180" cy="102" r="1" />
            <circle cx="420" cy="44" r="1.2" /><circle cx="750" cy="30" r="1" /><circle cx="280" cy="82" r="1" />
            <circle cx="540" cy="50" r="1.4" /><circle cx="820" cy="75" r="1.1" /><circle cx="680" cy="42" r="1" />
          </g>
          <g filter="url(#softBlur)">
            <ellipse cx="190" cy="155" rx="95" ry="32" fill="#fff" opacity="0.5" />
            <ellipse cx="265" cy="143" rx="65" ry="25" fill="#fff" opacity="0.45" />
            <ellipse cx="148" cy="153" rx="50" ry="20" fill="#fff" opacity="0.4" />
            <ellipse cx="880" cy="125" rx="85" ry="28" fill="#fff" opacity="0.35" />
            <ellipse cx="940" cy="115" rx="58" ry="22" fill="#fff" opacity="0.3" />
            <ellipse cx="540" cy="190" rx="65" ry="20" fill="#fff" opacity="0.28" />
            <ellipse cx="596" cy="182" rx="44" ry="16" fill="#fff" opacity="0.25" />
          </g>
          <polygon points="0,590 130,310 250,460 375,285 500,435 625,308 755,458 880,298 1010,448 1135,308 1265,438 1390,345 1440,388 1440,900 0,900" fill="url(#mtn1G)" opacity="0.72" />
          <polygon points="130,310 110,348 150,348" fill="url(#snowG)" opacity="0.92" />
          <polygon points="375,285 353,328 397,328" fill="url(#snowG)" opacity="0.92" />
          <polygon points="625,308 602,350 648,350" fill="url(#snowG)" opacity="0.88" />
          <polygon points="880,298 857,340 903,340" fill="url(#snowG)" opacity="0.92" />
          <polygon points="1135,308 1112,348 1158,348" fill="url(#snowG)" opacity="0.88" />
          <polygon points="0,660 185,428 305,538 430,395 555,505 680,385 805,518 930,405 1055,528 1180,415 1305,528 1430,440 1440,456 1440,900 0,900" fill="url(#mtn2G)" opacity="0.88" />
          <polygon points="185,428 166,458 204,458" fill="url(#snowG)" opacity="0.72" />
          <polygon points="430,395 412,424 448,424" fill="url(#snowG)" opacity="0.72" />
          <polygon points="680,385 662,412 698,412" fill="url(#snowG)" opacity="0.72" />
          <polygon points="930,405 912,432 948,432" fill="url(#snowG)" opacity="0.72" />
          <polygon points="0,730 210,540 360,650 510,490 660,612 810,522 960,642 1110,530 1260,650 1410,562 1440,578 1440,900 0,900" fill="url(#mtn3G)" opacity="0.94" />
          <g fill="url(#frstG)">
            <polygon points="0,790 28,712 56,790" /><polygon points="22,792 50,714 78,792" />
            <polygon points="48,786 76,708 104,786" /><polygon points="72,790 100,712 128,790" />
            <polygon points="98,787 126,709 154,787" /><polygon points="124,791 152,713 180,791" />
            <polygon points="150,788 178,710 206,788" /><polygon points="176,792 204,714 232,792" />
            <polygon points="202,787 230,709 258,787" />
            <polygon points="1185,788 1213,710 1241,788" /><polygon points="1210,792 1238,714 1266,792" />
            <polygon points="1236,787 1264,709 1292,787" /><polygon points="1262,790 1290,712 1318,790" />
            <polygon points="1288,788 1316,710 1344,788" /><polygon points="1314,792 1342,714 1370,792" />
            <polygon points="1340,787 1368,709 1396,787" /><polygon points="1366,790 1394,712 1422,790" />
            <polygon points="1390,788 1418,710 1440,788" />
            <polygon points="480,795 508,726 536,795" /><polygon points="514,792 542,723 570,792" />
            <polygon points="548,797 576,728 604,797" /><polygon points="660,793 688,724 716,793" />
            <polygon points="700,797 728,728 756,797" /><polygon points="760,792 788,723 816,792" />
            <polygon points="808,795 836,726 864,795" /><polygon points="854,792 882,723 910,792" />
            <polygon points="900,796 928,727 956,796" />
          </g>
          <ellipse cx="720" cy="848" rx="290" ry="42" fill="url(#lakeG)" opacity="0.62" />
          <ellipse cx="720" cy="848" rx="270" ry="30" fill="#1a4a90" opacity="0.28" />
          <ellipse cx="620" cy="846" rx="22" ry="2.5" fill="#5a9de0" opacity="0.3" />
          <ellipse cx="720" cy="852" rx="32" ry="2.2" fill="#5a9de0" opacity="0.28" />
          <ellipse cx="830" cy="847" rx="20" ry="2" fill="#5a9de0" opacity="0.3" />
          <path d="M0 862 Q360 848 720 864 Q1080 880 1440 862 L1440 900 L0 900Z" fill="#0a2e12" />
          <path d="M0 865 Q360 851 720 867 Q1080 883 1440 865" fill="none" stroke="#145220" strokeWidth="3" opacity="0.7" />
        </svg>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to bottom, rgba(30,60,120,0.38) 0%, rgba(0,0,0,0.1) 45%, rgba(0,20,60,0.45) 100%)" }} />

      {/* Content */}
      <div className="relative z-[2] max-w-[680px]">
        <div className="inline-block backdrop-blur-lg border border-white/20 text-[0.73rem] font-semibold tracking-[1.5px] uppercase py-1.5 px-[18px] rounded-full mb-6 text-white" style={{ background: "rgba(26,110,245,0.78)" }}>
          📷 Photography With Cam
        </div>
        <h1 className="font-heading text-[clamp(2.3rem,7vw,4.6rem)] font-bold leading-[1.1] text-white mb-[17px]" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
          Every Moment<br />Tells a <em className="text-[#7dd3fc]">Story</em>
        </h1>
        <p className="text-base text-white/90 leading-[1.75] max-w-[460px] mx-auto mb-9" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
          Real emotions. Real moments. Captured with passion and told through the lens of art.
        </p>
        <div className="flex gap-[11px] justify-center flex-wrap">
          <a
            href="#gallery"
            className="bg-blue text-white border-none py-[13px] px-[30px] rounded-full text-[0.93rem] font-semibold font-body shadow-[0_4px_20px_rgba(26,110,245,0.4)] hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(26,110,245,0.5)] transition-all no-underline inline-block"
          >
            View Gallery
          </a>
          <a
            href="#contact"
            className="bg-white/15 text-white border-2 border-white/55 backdrop-blur-md py-[11px] px-[26px] rounded-full text-[0.93rem] font-medium font-body hover:border-white hover:bg-white/30 transition-all no-underline inline-block"
          >
            Book a Session
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-[130px] md:bottom-[130px] left-1/2 flex flex-col items-center gap-1 text-white/65 text-[0.68rem] tracking-[1px] uppercase"
        style={{ animation: "bounce-scroll 2s ease-in-out infinite" }}
      >
        <ChevronDown className="w-3.5 h-3.5" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
