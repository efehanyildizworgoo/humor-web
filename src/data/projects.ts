export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  client: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string[];
  gallery: string[];
}

export const projects: ProjectData[] = [
  {
    slug: "greenpeak-marka-lansmani",
    title: "GreenPeak Marka Lansmanı",
    category: "Dijital Strateji & İçerik",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    desc: "Sıfırdan marka kimliği, sosyal medya stratejisi ve lansman kampanyası.",
    client: "GreenPeak",
    year: "2024",
    services: ["Dijital Strateji", "İçerik Üretimi", "Sosyal Medya Yönetimi"],
    challenge: "Yeni kurulan bir sürdürülebilir teknoloji markasının, yoğun rekabetin olduğu pazarda fark yaratması ve hedef kitlesiyle güçlü bir bağ kurması gerekiyordu.",
    solution: "Marka kimliğini sıfırdan tasarladık. Hedef kitle araştırması, rakip analizi ve pazar konumlandırması sonrası dijital strateji oluşturduk. 3 aylık lansman kampanyasıyla tüm sosyal medya kanallarını aktive ettik.",
    results: ["50K+ organik takipçi (3 ay)", "%280 etkileşim artışı", "15+ medya haberi", "2 sektör ödülü"],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
  },
  {
    slug: "techvista-reklam-filmi",
    title: "TechVista Reklam Filmi",
    category: "Prodüksiyon",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    desc: "Sinematik kurumsal tanıtım filmi. Konsept, çekim ve post-prodüksiyon.",
    client: "TechVista",
    year: "2024",
    services: ["Prodüksiyon", "Senaryo Yazımı", "Video Kurgulama"],
    challenge: "Teknoloji sektöründe faaliyet gösteren firmanın kurumsal kimliğini ve yenilikçi vizyonunu sinematik bir dille anlatmak gerekiyordu.",
    solution: "Konsept ve senaryo aşamasından çekim ve post-prodüksiyona kadar tüm süreci yönettik. 2 gün set çekimi, profesyonel oyuncu kadrosu ve sinematik görüntü yönetimi ile etkileyici bir tanıtım filmi ortaya çıkardık.",
    results: ["1M+ YouTube görüntülenme", "TV yayını (3 ulusal kanal)", "%95 müşteri memnuniyeti", "Sektör fuarlarında gösterim"],
    gallery: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80",
    ],
  },
  {
    slug: "bloom-cosmetics-sosyal-medya",
    title: "Bloom Cosmetics Sosyal Medya",
    category: "Sosyal Medya Yönetimi",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd2?w=800&q=80",
    desc: "6 aylık sosyal medya yönetimi. %340 etkileşim artışı.",
    client: "Bloom Cosmetics",
    year: "2024",
    services: ["Sosyal Medya Yönetimi", "İçerik Üretimi", "Reklam Yönetimi"],
    challenge: "Kozmetik sektöründe düşük etkileşim oranları ve organik erişim kaybı yaşayan markanın sosyal medya varlığını canlandırmak gerekiyordu.",
    solution: "Marka sesini yeniden tanımladık. Instagram ve TikTok'a özel içerik stratejisi oluşturduk. Haftalık Reels planlaması, topluluk yönetimi ve influencer işbirlikleri ile markayı yeniden konumlandırdık.",
    results: ["%340 etkileşim artışı", "120K yeni takipçi (6 ay)", "%45 web trafiği artışı", "8 influencer işbirliği"],
    gallery: [
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd2?w=800&q=80",
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80",
    ],
  },
  {
    slug: "arkitekt-studio-drone",
    title: "Arkitekt Studio Drone",
    category: "Drone Çekimi",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    desc: "Mimari projelerin 8K drone ile havadan görüntülenmesi.",
    client: "Arkitekt Studio",
    year: "2023",
    services: ["Drone Çekimi", "Video Kurgulama"],
    challenge: "Mimari projelerin büyüklüğünü ve detayını geleneksel fotoğrafla anlatmak yetersiz kalıyordu. Projelerin tamamını kuşbakışı gösterecek profesyonel çekimlere ihtiyaç vardı.",
    solution: "DJI Inspire 3 ile 8K çözünürlükte havadan çekimler gerçekleştirdik. İnşaat sürecinin farklı aşamalarını dökümente ettik. Sinematik kurgu ile etkileyici tanıtım videoları oluşturduk.",
    results: ["12 proje çekimi", "20+ emlak satışına katkı", "Mimarlık dergilerinde yayın", "Uluslararası fuar gösterimi"],
    gallery: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      "https://images.unsplash.com/photo-1506947411487-a56738b8ee8b?w=800&q=80",
      "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&q=80",
    ],
  },
  {
    slug: "soundwave-festival",
    title: "SoundWave Festival",
    category: "Canlı Yayın & Prodüksiyon",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    desc: "Multi-kamera canlı yayın ve aftermovie prodüksiyonu.",
    client: "SoundWave Events",
    year: "2024",
    services: ["Canlı Yayın", "Prodüksiyon", "Video Kurgulama"],
    challenge: "3 gün süren müzik festivalinin tüm sahne performanslarını canlı yayınlamak ve etkinlik sonrası viral aftermovie üretmek gerekiyordu.",
    solution: "4 kameralı canlı yayın setup'ı kurduk. YouTube ve Instagram'a eş zamanlı streaming yaptık. Aynı zamanda aftermovie için sinematik çekimler gerçekleştirdik.",
    results: ["500K+ canlı yayın izlenmesi", "3M+ aftermovie görüntülenmesi", "Sponsor memnuniyeti", "Ertesi yıl yeniden anlaşma"],
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    ],
  },
  {
    slug: "novatech-reels-serisi",
    title: "NovaTech Reels Serisi",
    category: "İçerik Üretimi",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    desc: "Viral Reels serisi. 2M+ organik görüntülenme.",
    client: "NovaTech",
    year: "2024",
    services: ["İçerik Üretimi", "Sosyal Medya Yönetimi"],
    challenge: "Teknoloji ürünlerini genç kitleye Instagram Reels üzerinden tanıtmak ve organik büyüme sağlamak hedefleniyordu.",
    solution: "Trend analizi yaparak markanın tonuna uygun Reels formatları geliştirdik. Haftalık 5 Reels üretimi ile tutarlı bir içerik akışı oluşturduk. Hook, edit ve CTA optimizasyonu ile viral potansiyeli artırdık.",
    results: ["2M+ organik görüntülenme", "35K yeni takipçi (2 ay)", "%420 etkileşim artışı", "3 viral içerik (100K+)"],
    gallery: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    ],
  },
];

export const categories = ["Tümü", "Dijital Strateji & İçerik", "Prodüksiyon", "Sosyal Medya Yönetimi", "Drone Çekimi", "Canlı Yayın & Prodüksiyon", "İçerik Üretimi"];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}
