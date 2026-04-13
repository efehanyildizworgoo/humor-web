"use client";

const logos = [
  { src: "/logos/trt.png", alt: "TRT" },
  { src: "/logos/sahibinden.png", alt: "Sahibinden" },
  { src: "/logos/panora.png", alt: "Panora" },
  { src: "/logos/mac.png", alt: "MAC" },
  { src: "/logos/asus.png", alt: "ASUS" },
  { src: "/logos/turkiye-sigorta.png", alt: "Türkiye Sigorta" },
  { src: "/logos/lassa.png", alt: "Lassa" },
  { src: "/logos/soler.png", alt: "Şölen" },
  { src: "/logos/velux.png", alt: "Velux" },
  { src: "/logos/relax.png", alt: "Relax" },
  { src: "/logos/natura-dunyasi.png", alt: "Natura Dünyası" },
  { src: "/logos/oila.png", alt: "Oila" },
  { src: "/logos/avion.png", alt: "Avion" },
  { src: "/logos/fabregas.png", alt: "Fabregas" },
  { src: "/logos/pusat.png", alt: "Pusat" },
  { src: "/logos/luppo.png", alt: "Luppo" },
  { src: "/logos/ozmo.png", alt: "Ozmo" },
  { src: "/logos/tat.png", alt: "Tat" },
  { src: "/logos/ak-parti.png", alt: "AK Parti" },
  { src: "/logos/ankara-bbsk.png", alt: "Ankara Büyükşehir Belediyesi" },
  { src: "/logos/dirilis.png", alt: "Diriliş" },
  { src: "/logos/hasan-soley.png", alt: "Hasan Söley" },
  { src: "/logos/kocalar.png", alt: "Koçalar Yapı" },
  { src: "/logos/firat-life-style.png", alt: "Fırat Life Style" },
  { src: "/logos/calisma-sosyal-guvenlik.png", alt: "Çalışma ve Sosyal Güvenlik Bakanlığı" },
  { src: "/logos/yamanlar.png", alt: "Yamanlar" },
];

export default function LogoMarquee() {
  const items = [...logos, ...logos];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-[#0d1220]/60 backdrop-blur-sm">
      <div className="overflow-hidden py-4">
        <div className="marquee-track flex w-max items-center gap-14 sm:gap-20">
          {items.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[140px] sm:w-[170px] h-[44px] sm:h-[54px] flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain select-none grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
