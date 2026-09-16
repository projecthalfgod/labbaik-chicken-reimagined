import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Instagram, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import drumstickAsset from "@/assets/Gambar_Codex_15_Sep_2026_18.55.17.png.asset.json";
import chickenPartyAsset from "@/assets/Gambar_Codex_15_Sep_2026_14.09.01.png.asset.json";
import chickenSpreadAsset from "@/assets/Gambar_Codex_15_Sep_2026_14.10.53.png.asset.json";
import labbaikLogoAsset from "@/assets/labbaik-chicken-logo.png.asset.json";

const orderUrl = "https://esborder.qs.esb.co.id/labbaikchicken";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LABBAIK Chicken | The First Oven Fried Chicken" },
      { name: "description", content: "Nikmati ayam oven-fried LABBAIK Chicken yang renyah, lebih sehat, higienis, dan halal." },
      { property: "og:title", content: "LABBAIK Chicken | The First Oven Fried Chicken" },
      { property: "og:description", content: "Ayam crispy oven-fried yang lebih sehat, renyah, segar, higienis, dan halal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  ["01", "SIGNATURE", "FRIED CHICKEN", chickenPartyAsset.url],
  ["02", "RICE", "SERIES", drumstickAsset.url],
  ["03", "PASTA, STEAK", "& BURGER", chickenSpreadAsset.url],
  ["04", "DESSERT &", "BEVERAGES", drumstickAsset.url],
  ["05", "FAMILY & VALUE", "PACKAGES", chickenPartyAsset.url],
];

function WaveDivider({ tone }: { tone: "red" | "cream" | "yellow" }) {
  return (
    <div className={`wave wave-${tone}`} aria-hidden="true">
      <div className="wave-runner">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 58C145 11 266 107 430 60C593 14 712 103 880 58C1048 13 1177 103 1440 47V120H0Z" />
        </svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 58C145 11 266 107 430 60C593 14 712 103 880 58C1048 13 1177 103 1440 47V120H0Z" />
        </svg>
      </div>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [cookies, setCookies] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1250);
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => reveal.observe(node));
    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    let frame = 0;
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const updateParallax = () => {
      const viewportCenter = window.innerHeight / 2;
      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        const speed = Number(node.dataset["speed"] ?? 0.08);
        const offset = (rect.top + rect.height / 2 - viewportCenter) * speed;
        node.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(timer);
      reveal.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="site-shell overflow-hidden bg-background text-foreground">
      <div className={`loader ${loaded ? "loader-done" : ""}`} aria-hidden="true">
        <div className="loader-rays" />
        <img src={drumstickAsset.url} alt="" className="loader-chicken" />
        <p>PREPARING SOMETHING CRISPY!</p>
      </div>

      <div className="cursor-dot" aria-hidden="true" />

      <header className="site-header">
        <a href="#top" className="brand-mark" aria-label="LABBAIK Chicken home">
          <img src={labbaikLogoAsset.url} alt="LABBAIK Chicken" />
        </a>
        <div className="header-actions">
          <a className="pill pill-solid" href={orderUrl} target="_blank" rel="noreferrer">ORDER</a>
          <button className="pill pill-outline" onClick={() => setMenuOpen(true)} aria-label="Buka menu">
            MENU <Menu size={18} strokeWidth={3} />
          </button>
        </div>
      </header>

      <div className={`menu-overlay ${menuOpen ? "menu-open" : ""}`} aria-hidden={!menuOpen}>
        <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Tutup menu"><X /></button>
        {[["HOME", "#top"], ["MENU KAMI", "#menu"], ["TENTANG", "#tentang"], ["LAYANAN", "#layanan"], ["KARIER", "#karier"]].map(([label, href], index) => (
          <a href={href} key={label} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}<ArrowUpRight /></a>
        ))}
      </div>

      <section id="top" className="hero-section">
        <div className="hero-kicker" data-parallax data-speed="-0.08">READY TO CRUNCH!</div>
        <h1 className="hero-title" aria-label="The First Oven Fried Chicken">
          <span>THE FIRST</span><span>OVEN FRIED</span><span className="hero-outline">CHICKEN</span>
        </h1>
        <div className="sticker sticker-left" data-parallax data-speed="0.1">LEBIH<br />SEHAT</div>
        <div className="sticker sticker-right" data-parallax data-speed="-0.12">REN­YAH<br />& HALAL</div>
        <div className="hero-chicken-parallax" data-parallax data-speed="0.16"><img src={drumstickAsset.url} alt="Ayam oven-fried renyah LABBAIK Chicken" className="hero-chicken" /></div>
        <div className="hero-eye eye-left" /><div className="hero-eye eye-right" />
        <div className="hero-bottom">
          <p>Ayam crispy yang melewati proses oven membuat minyak berkurang dan lebih sehat.</p>
          <div className="scroll-cue"><ArrowDown /><span>SCROLL TO CRUNCH</span></div>
          <p>Selalu segar, higienis, halal, dan tetap renyah di setiap gigitan.</p>
        </div>
      </section>

      <section className="classic-section" id="tentang">
        <div data-reveal className="reveal-up">
          <div className="stamp">OUR SIGNATURE</div>
          <h2>CRISPY, JUICY<br />FULLY LOADED</h2>
          <p>LABBAIK Chicken menghadirkan sensasi ayam crispy oven-fried yang lebih ringan, lebih renyah, dan selalu dibuat segar.</p>
          <a className="cta-button" href={orderUrl} target="_blank" rel="noreferrer">ORDER SEKARANG <ArrowUpRight /></a>
        </div>
        <div className="chicken-collage">
          <div className="photo-card card-one" data-reveal data-parallax data-speed="0.08"><img src={chickenSpreadAsset.url} alt="Pilihan ayam crispy LABBAIK" /></div>
          <div className="photo-card card-two" data-reveal data-parallax data-speed="-0.11"><img src={drumstickAsset.url} alt="Ayam crispy LABBAIK" /></div>
          <div className="photo-card card-three" data-reveal data-parallax data-speed="0.14"><img src={chickenPartyAsset.url} alt="Menu ayam LABBAIK" /></div>
        </div>
      </section>

      <WaveDivider tone="red" />
      <section className="experience-section">
        <div className="corner-notes left-note"><b>LESS OIL</b><span>OVEN-FRIED</span><span>ALWAYS FRESH</span></div>
        <div className="corner-notes right-note"><b>100% HALAL</b><span>HYGIENIC</span><span>TRUE CRUNCH</span></div>
        <div data-reveal className="reveal-up experience-copy">
          <div className="stamp stamp-light">THE EXPERIENCE</div>
          <h2>FOOD THAT<br />FEELS GOOD</h2>
        </div>
        <div className="experience-chicken-parallax" data-parallax data-speed="0.13"><img src={chickenPartyAsset.url} alt="Koleksi ayam crispy LABBAIK Chicken" className="experience-chicken" /></div>
        <div className="scribble scribble-one">↘</div><div className="scribble scribble-two">YUM!</div>
        <div className="marquee"><div>CRISPY • HALAL • FRESH • OVEN-FRIED • CRISPY • HALAL • FRESH • OVEN-FRIED • </div></div>
      </section>

      <WaveDivider tone="cream" />
      <section className="quality-section">
        <div className="quality-copy" data-reveal>
          <div className="stamp">PURE QUALITY</div>
          <h2>EVERY BITE<br />PACKED WITH<br /><span>CRUNCH</span></h2>
        </div>
        <div className="float-chicken float-one" data-parallax data-speed="0.18"><img src={drumstickAsset.url} alt="Ayam LABBAIK renyah" /></div>
        <div className="float-chicken float-two" data-parallax data-speed="-0.16"><img src={drumstickAsset.url} alt="Ayam LABBAIK oven-fried" /></div>
        <div className="quality-list"><span>01 / FRESHLY PREPARED</span><span>02 / OVEN FINISHED</span><span>03 / SERVED HOT</span></div>
      </section>

      <WaveDivider tone="yellow" />
      <section className="menu-section" id="menu">
        <div className="menu-heading" data-reveal>
          <div className="stamp stamp-dark">MENU KAMI</div>
          <h2>A FAVORITE<br />FOR EVERYONE</h2>
          <p>Pilihan menu terbaik kami—enak, segar, dan siap jadi favoritmu.</p>
        </div>
        <div className="flight-scene" data-reveal aria-hidden="true">
          <svg className="flight-path" viewBox="0 0 1200 270" preserveAspectRatio="none">
            <path d="M-40 235C170 5 370 27 515 142C692 281 861 271 1240 35" />
          </svg>
          <div className="flight-dashes" />
          <span className="flight-dot dot-leaf">FRESH</span>
          <span className="flight-dot dot-hot">HOT</span>
          <span className="flight-dot dot-oven">OVEN</span>
          <div className="flying-chicken"><img src={drumstickAsset.url} alt="" /></div>
          <strong>CRUNCH ON THE MOVE!</strong>
        </div>
        <div className="menu-track">
          {categories.map(([number, top, bottom, image], index) => (
            <article className="menu-card" key={number} data-reveal>
              <span className="menu-number">{number}</span>
              <img src={image} alt={`${top} ${bottom}`} />
              <h3>{top}<br />{bottom}</h3>
              <span className="menu-arrow"><ArrowUpRight /></span>
              {index < categories.length - 1 && <span className="travel-line">················</span>}
            </article>
          ))}
        </div>
      </section>

      <WaveDivider tone="cream" />
      <section className="family-section" id="layanan">
        <div className="family-visual" data-reveal data-parallax data-speed="0.08"><img src={chickenSpreadAsset.url} alt="Paket keluarga LABBAIK Chicken" /><span>SHARE THE<br />CRUNCH!</span></div>
        <div className="family-copy" data-reveal>
          <div className="stamp">FEEL AT HOME</div>
          <h2>GOOD FOOD.<br />WARM MOMENTS.</h2>
          <p>Tempat makan yang nyaman, hangat, dan ramah keluarga. Nikmati pengalaman bersantap yang tenang dengan ayam oven-fried yang tetap renyah.</p>
          <div className="service-row"><span>DINE IN</span><span>TAKE AWAY</span><span>DELIVERY</span><span>CATERING</span></div>
          <a className="cta-button" href="https://wa.me/6285220000800" target="_blank" rel="noreferrer">HUBUNGI KAMI <ArrowUpRight /></a>
        </div>
      </section>

      <section className="career-strip" id="karier">
        <p>GROW WITH US</p><h2>AYO BELAJAR DAN<br />BEKERJA BERSAMA!</h2>
        <a href="http://forms.gle/3Zn3EHuM5kaeuJFdA" target="_blank" rel="noreferrer">KIRIM LAMARAN <ArrowUpRight /></a>
      </section>

      <footer>
        <div className="footer-top">
          <div><b>OPEN 24 HOURS</b><p>Jumat tutup 11:30–12:30 untuk salat Jumat</p></div>
          <div><b>LET'S TALK</b><a href="tel:+6285220000800">0852-2000-0800</a><a href="mailto:cslabbaikchiken@gmail.com">cslabbaikchiken@gmail.com</a></div>
          <div><b>FOLLOW THE CRUNCH</b><a href="https://www.instagram.com/labbaikchicken/" target="_blank" rel="noreferrer"><Instagram size={17} /> @labbaikchicken</a></div>
        </div>
        <div className="footer-wordmark">LABBAIK</div>
        <p className="footer-legal">© 2026 LABBAIK CHICKEN — THE FIRST OVEN FRIED CHICKEN</p>
      </footer>

      {cookies && <div className="cookie-box"><span className="cookie-dot" /><div><b>COOKIES IN USE</b><small>Kami menggunakannya agar pengalamanmu tetap renyah.</small></div><button onClick={() => setCookies(false)}>NANTI</button><button className="cookie-ok" onClick={() => setCookies(false)}>OKAY!</button></div>}
    </main>
  );
}
