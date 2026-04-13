import {
  Megaphone,
  Lightbulb,
  PenTool,
  BarChart3,
  Clapperboard,
  Video,
  Plane,
  Radio,
  FileText,
  type LucideIcon,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  heroImage: string;
  aboutImage: string;
  keywords: string[];
  description: string;
  longDescription: string;
  whyUs: string;
  idealFor: string[];
  features: { title: string; text: string }[];
  process: { step: string; desc: string }[];
  faqs: { q: string; a: string }[];
  gallery: string[];
  testimonials: { name: string; title: string; text: string }[];
  seoText: string;
  bannerText: string;
}

export const services: ServiceData[] = [
  {
    slug: "sosyal-medya-yonetimi",
    icon: Megaphone,
    title: "Sosyal Medya Yönetimi",
    shortDesc: "Instagram, TikTok, LinkedIn yönetimi",
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    keywords: ["Instagram & TikTok", "LinkedIn & X", "Topluluk Yönetimi"],
    description: "Markanızı sosyal medyada aktif ve etkileyici tutuyoruz. Planlama, içerik takvimi, topluluk yönetimi ve performans raporlaması ile sosyal medyanızı uçtan uca yönetiyoruz.",
    longDescription: "Sosyal medya artık sadece paylaşım yapmak değil — markanızın dijital vitrini. İçerik takvimi oluşturma, görsel ve metin üretimi, topluluk yönetimi, kriz iletişimi ve aylık performans raporlaması dahil uçtan uca yönetim sunuyoruz. Instagram, TikTok, LinkedIn, X (Twitter) ve Facebook platformlarında markanızı büyütüyoruz. Her platformun algoritmasını ve kullanıcı davranışlarını analiz ederek organik erişiminizi maksimize ediyoruz.",
    whyUs: "Her marka için kopyala-yapıştır içerik üretmiyoruz. Markanızın DNA'sını anlıyor, sektörünüze ve hedef kitlenize özel strateji geliştiriyoruz. Aylık ortalama %200+ etkileşim artışı sağlıyoruz.",
    idealFor: ["E-ticaret markaları", "Yerel işletmeler", "Kurumsal firmalar", "Kişisel markalar", "Startuplar"],
    features: [
      { title: "İçerik Takvimi & Planlama", text: "Aylık içerik planlaması, özel günler takvimi ve zamanlama ile tutarlı bir marka varlığı oluşturuyoruz." },
      { title: "Topluluk Yönetimi", text: "Yorum, DM ve etkileşim yönetimi ile kitlenizle güçlü bağlar kuruyoruz. Kriz anlarında hızlı müdahale." },
      { title: "Performans Raporlaması", text: "Haftalık ve aylık detaylı raporlarla büyüme metriklerini, erişim ve etkileşim oranlarını takip ediyoruz." },
      { title: "Trend Takibi & Reels", text: "Güncel trendleri takip edip markanıza uyarlıyoruz. Viral potansiyeli yüksek Reels ve Shorts üretiyoruz." },
    ],
    process: [
      { step: "Keşif", desc: "Marka kimliğinizi, hedef kitlenizi ve rakiplerinizi analiz ediyoruz." },
      { step: "Strateji", desc: "Platforma özel içerik stratejisi ve ton of voice belirliyoruz." },
      { step: "Üretim", desc: "Görseller, copyler ve reelsler hazırlıyoruz." },
      { step: "Yönetim", desc: "Yayınlama, etkileşim takibi ve optimizasyon." },
    ],
    faqs: [
      { q: "Hangi platformlarda yönetim yapıyorsunuz?", a: "Instagram, TikTok, LinkedIn, X (Twitter), Facebook ve YouTube platformlarında hizmet veriyoruz." },
      { q: "Minimum anlaşma süresi var mı?", a: "Sosyal medya stratejilerinin sonuç vermesi zaman aldığı için minimum 3 aylık anlaşma öneriyoruz." },
      { q: "İçerikleri biz onaylıyor muyuz?", a: "Evet, tüm içerikler yayınlanmadan önce sizin onayınıza sunulur." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80",
    ],
    testimonials: [
      { name: "Ayşe Kara", title: "Kurucu, Bloom Cosmetics", text: "Sosyal medyamız Humor'la tanıştıktan sonra bambaşka bir boyut kazandı. 6 ayda %340 etkileşim artışı elde ettik." },
      { name: "Elif Başaran", title: "Marka Müdürü, GreenPeak", text: "İçerik takvimi ve topluluk yönetimi mükemmel. Her ay neyin işe yaradığını raporlarla net görüyoruz." },
    ],
    bannerText: "Sosyal medyanızı şansa bırakmayın. Stratejik yönetimle organik büyümenizi hızlandırın.",
    seoText: "Ankara sosyal medya yönetimi hizmeti sunan Humor Creative, Instagram yönetimi, TikTok içerik üretimi, LinkedIn strateji danışmanlığı, Facebook sayfa yönetimi ve X (Twitter) hesap yönetimi alanlarında profesyonel çözümler üretmektedir. Sosyal medya içerik takvimi oluşturma, topluluk yönetimi, etkileşim artırma, organik erişim optimizasyonu, sosyal medya raporlaması ve kriz yönetimi dahil uçtan uca hizmet vermekteyiz. Ankara sosyal medya ajansı, Instagram yönetimi Ankara, TikTok ajansı Ankara, sosyal medya danışmanlığı arayanlar için Humor Creative güvenilir çözüm ortağınızdır.",
  },
  {
    slug: "dijital-strateji",
    icon: Lightbulb,
    title: "Dijital Strateji",
    shortDesc: "Marka konumlandırma & büyüme",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    keywords: ["Marka Konumlandırma", "Hedef Kitle Analizi", "Büyüme Stratejisi"],
    description: "Veriye dayalı, sonuç odaklı dijital stratejiler kuruyoruz. Markanızı doğru kitleye, doğru mesajla ulaştırıyoruz.",
    longDescription: "Dijital dünyada var olmak yetmez; fark edilmek, hatırlanmak ve tercih edilmek gerekir. Rakip analizi, pazar araştırması, hedef kitle segmentasyonu ve kanal stratejisi ile markanızın dijital yol haritasını çiziyoruz. Mevcut dijital varlığınızı audit ediyor, güçlü ve zayıf yönlerinizi tespit edip data-driven bir büyüme planı oluşturuyoruz.",
    whyUs: "Stratejiyi sadece PowerPoint'e değil, uygulamaya döküyoruz. Her strateji kararının arkasında veri var. Ölçülebilir KPI'lar koyuyor ve sonuçları takip ediyoruz.",
    idealFor: ["Yeni lansman yapacak markalar", "Dijital dönüşüm sürecindeki firmalar", "Büyüme hedefleyen startuplar", "Rekabetin yoğun olduğu sektörler"],
    features: [
      { title: "Marka Konumlandırma", text: "Rakip analizi ve pazar araştırması ile markanızın dijital konumunu belirliyoruz." },
      { title: "Hedef Kitle Analizi", text: "Data-driven persona oluşturma ve kitle segmentasyonu yapıyoruz." },
      { title: "Büyüme Yol Haritası", text: "KPI'lar, milestone'lar ve aksiyon planları ile ölçülebilir hedefler koyuyoruz." },
      { title: "Kanal Stratejisi", text: "Hangi platformda, ne tür içerikle, ne sıklıkta var olacağınızı belirliyoruz." },
    ],
    process: [
      { step: "Analiz", desc: "Mevcut dijital varlığınızı ve rakipleri derinlemesine inceliyoruz." },
      { step: "Planlama", desc: "Kanal stratejisi, bütçe dağılımı ve zaman çizelgesi oluşturuyoruz." },
      { step: "Uygulama", desc: "Stratejiyi hayata geçiriyor, A/B testleri yapıyoruz." },
      { step: "Optimizasyon", desc: "Veriye göre sürekli iyileştirme ve raporlama." },
    ],
    faqs: [
      { q: "Strateji çalışması ne kadar sürer?", a: "Kapsamlı bir dijital strateji çalışması ortalama 2-4 hafta sürer." },
      { q: "Sadece strateji mi yoksa uygulamayı da yapıyor musunuz?", a: "Her ikisini de yapıyoruz. Stratejiyi oluşturup uygulamayı da biz yürütebiliyoruz." },
      { q: "Mevcut ajansımızla birlikte çalışabilir misiniz?", a: "Evet, strateji danışmanlığı olarak mevcut ekibinize destek verebiliriz." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    ],
    testimonials: [
      { name: "Elif Başaran", title: "Marka Müdürü, GreenPeak", text: "Lansman stratejimizi Humor kurguladı. Veriye dayalı yaklaşımları sayesinde ilk 3 ayda hedefimizi aştık." },
      { name: "Mehmet Yılmaz", title: "Pazarlama Direktörü, TechVista", text: "Dijital strateji danışmanlığıyla pazardaki konumumuz tamamen değişti. ROI odaklı çalışmaları çok değerli." },
    ],
    bannerText: "Veriye dayalı strateji ile dijital büyümenizi hızlandırın. Rakiplerden bir adım önde olun.",
    seoText: "Ankara dijital strateji danışmanlığı hizmeti sunan Humor Creative, marka konumlandırma, hedef kitle analizi, dijital pazarlama stratejisi, büyüme yol haritası ve kanal stratejisi oluşturma alanlarında uzman ekibiyle hizmet vermektedir. Rakip analizi, pazar araştırması, data-driven persona oluşturma, KPI belirleme ve performans takibi dahil kapsamlı dijital strateji hizmetleri sunmaktayız. Ankara dijital pazarlama danışmanlığı, marka stratejisi Ankara, dijital dönüşüm danışmanlığı arayanlar için Humor Creative doğru çözüm ortağıdır.",
  },
  {
    slug: "icerik-uretimi",
    icon: PenTool,
    title: "İçerik Üretimi",
    shortDesc: "Görsel tasarım, copywriting, reels",
    heroImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    keywords: ["Görsel Tasarım", "Copywriting", "Reels & Shorts"],
    description: "Yaratıcı ve özgün içeriklerle fark yaratıyoruz. Her platforma özel, dikkat çeken içerikler üretiyoruz.",
    longDescription: "İçerik, dijital pazarlamanın kalbidir. Feed görselleri, story tasarımları, Reels, Shorts, carousel postlar, infografikler ve blog yazıları dahil her formatta içerik üretiyoruz. Marka kimliğinize sadık kalarak her platforma özel, algoritma dostu ve hedef kitlenizin ilgisini çekecek içerikler hazırlıyoruz.",
    whyUs: "Tasarım, metin ve video prodüksiyonunu tek çatı altında sunuyoruz. Dışarıdan freelancer aramak yerine tutarlı kalitede ve hızlı teslimat garantisi veriyoruz.",
    idealFor: ["Düzenli içerik ihtiyacı olan markalar", "Sosyal medyada büyümek isteyen işletmeler", "Kampanya ve lansman projeleri", "Influencer ve kişisel markalar"],
    features: [
      { title: "Görsel Tasarım", text: "Marka kimliğinize uygun, dikkat çekici feed, story ve carousel tasarımları." },
      { title: "Copywriting", text: "Etkileşim odaklı, markanızın sesini yansıtan SEO uyumlu metinler." },
      { title: "Reels & Shorts", text: "Trend takibi ve viral potansiyeli yüksek kısa video içerikler." },
      { title: "Blog & Makale", text: "SEO odaklı, bilgi veren ve markanızı uzman konumlandıran yazılı içerikler." },
    ],
    process: [
      { step: "Brief", desc: "İçerik ihtiyacınızı ve marka yönergelerinizi anlıyoruz." },
      { step: "Konsept", desc: "Yaratıcı fikirler ve moodboard hazırlıyoruz." },
      { step: "Üretim", desc: "Tasarım, yazım ve video çekimi." },
      { step: "Revizyon", desc: "Geri bildirime göre finalize ediyoruz." },
    ],
    faqs: [
      { q: "Aylık kaç içerik üretiyorsunuz?", a: "Pakete göre aylık 12-30 arası içerik üretiyoruz. İhtiyacınıza göre özel paketler de oluşturuyoruz." },
      { q: "Fotoğraf çekimi de dahil mi?", a: "Ürün ve mekan fotoğrafçılığı ayrı olarak sunulur. Stok ve tasarım bazlı görseller paket dahilindedir." },
      { q: "Revizyon hakkı var mı?", a: "Her içerik için 2 revizyon hakkınız bulunur." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    ],
    testimonials: [
      { name: "Selin Aydın", title: "İletişim Uzmanı, NovaTech", text: "Reels serimiz viral oldu — 2 milyonun üzerinde organik görüntülenme aldık. İçerik kalitesi inanılmaz." },
      { name: "Ayşe Kara", title: "Kurucu, Bloom Cosmetics", text: "Her paylaşım markanın ruhunu yansıtıyor. Tutarlı ve kreatif içeriklerle fark yaratıyorlar." },
    ],
    bannerText: "İçerik kraldır — ama doğru içerik imparatordur. Markanıza özel, dikkat çeken içerikler üretelim.",
    seoText: "Ankara içerik üretimi hizmeti sunan Humor Creative, sosyal medya görsel tasarımı, copywriting, Reels ve Shorts video üretimi, carousel post tasarımı, infografik hazırlama, blog yazarlığı ve SEO uyumlu içerik üretimi alanlarında profesyonel hizmet vermektedir. Marka kimliğine uygun, platforma özel, algoritma dostu ve hedef kitle odaklı içerikler üretiyoruz. Ankara içerik ajansı, sosyal medya içerik üretimi Ankara, görsel tasarım hizmeti, copywriting ajansı Ankara arayanlar için Humor Creative güvenilir çözüm ortağınızdır.",
  },
  {
    slug: "reklam-yonetimi",
    icon: BarChart3,
    title: "Reklam Yönetimi",
    shortDesc: "Meta Ads, Google Ads, performans",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    keywords: ["Meta Ads", "Google Ads", "Performans Pazarlama"],
    description: "Dijital reklamlarınızı en verimli şekilde yönetiyoruz. ROI odaklı kampanyalarla bütçenizi değere dönüştürüyoruz.",
    longDescription: "Facebook, Instagram, Google, YouTube ve TikTok reklamlarınızı profesyonelce yönetiyoruz. Hedef kitle oluşturma, reklam metni ve görseli hazırlama, A/B testleri, retargeting kampanyaları ve performans optimizasyonu ile reklam bütçenizden maksimum verimi alıyoruz. Pixel kurulumu, dönüşüm takibi ve attribution modelleme dahil teknik altyapıyı da biz kuruyoruz.",
    whyUs: "Sadece reklam vermiyoruz, dönüşüm odaklı kampanyalar kuruyoruz. Her harcanan TL'nin hesabını veriyor, gerçek zamanlı dashboard ile şeffaf raporlama sunuyoruz.",
    idealFor: ["E-ticaret siteleri", "Lead generation ihtiyacı olan firmalar", "Uygulama tanıtımı", "Yerel işletmeler", "B2B şirketler"],
    features: [
      { title: "Meta Ads", text: "Facebook ve Instagram reklamlarında gelişmiş hedef kitle optimizasyonu ve lookalike audience." },
      { title: "Google Ads", text: "Arama, display, shopping ve YouTube reklam kampanyaları yönetimi." },
      { title: "TikTok Ads", text: "Genç kitleye ulaşmak için TikTok reklam kampanyaları." },
      { title: "Performans Takibi", text: "Gerçek zamanlı dashboard, haftalık optimizasyon ve aylık detaylı raporlama." },
    ],
    process: [
      { step: "Hedef Belirleme", desc: "Kampanya hedeflerini, bütçeyi ve KPI'ları tanımlıyoruz." },
      { step: "Kurulum", desc: "Hedef kitle, reklam metni, görseller ve pixel kurulumu." },
      { step: "Yayın & Test", desc: "Kampanyaları başlatıp A/B testleri yapıyoruz." },
      { step: "Raporlama", desc: "Detaylı performans analizi ve bütçe optimizasyonu." },
    ],
    faqs: [
      { q: "Minimum reklam bütçesi ne kadar olmalı?", a: "Platform ve hedefe göre değişmekle birlikte aylık minimum 5.000 TL reklam bütçesi öneriyoruz." },
      { q: "Reklam yönetim ücreti nasıl belirleniyor?", a: "Reklam bütçesinin %15-20'si veya sabit aylık ücret olarak çalışıyoruz." },
      { q: "Ne kadar sürede sonuç alabilirim?", a: "İlk sonuçlar 1-2 hafta içinde görülür. Optimum performans için 4-6 hafta öneriyoruz." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    ],
    testimonials: [
      { name: "Mehmet Yılmaz", title: "Pazarlama Direktörü, TechVista", text: "Google Ads kampanyamızın ROI'si Humor'la çalışmaya başladıktan sonra 3 katına çıktı." },
      { name: "Can Demir", title: "E-ticaret Müdürü, ShopZone", text: "Meta Ads yönetimiyle satışlarımız %180 arttı. Şeffaf raporlama ve hızlı optimizasyon harika." },
    ],
    bannerText: "Reklam bütçenizi değere dönüştürün. ROI odaklı kampanyalarla büyüyün.",
    seoText: "Ankara reklam yönetimi hizmeti sunan Humor Creative, Meta Ads (Facebook Ads, Instagram Ads), Google Ads (arama, display, shopping, YouTube), TikTok Ads ve performans pazarlama alanlarında uzman ekibiyle hizmet vermektedir. Hedef kitle oluşturma, A/B testi, retargeting, pixel kurulumu, dönüşüm takibi ve reklam bütçesi optimizasyonu dahil kapsamlı dijital reklam yönetimi sunmaktayız. Ankara Google Ads ajansı, Meta Ads yönetimi Ankara, performans pazarlama ajansı Ankara arayanlar için Humor Creative ideal çözüm ortağıdır.",
  },
  {
    slug: "produksiyon",
    icon: Clapperboard,
    title: "Prodüksiyon",
    shortDesc: "Reklam filmi, tanıtım, kurumsal",
    heroImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80",
    keywords: ["Reklam Filmi", "Tanıtım Filmi", "Kurumsal Video"],
    description: "Profesyonel video ve fotoğraf prodüksiyonu. Sinematik kalitede içeriklerle markanızın hikayesini anlatıyoruz.",
    longDescription: "Konseptten son kareye kadar tüm prodüksiyon sürecini yönetiyoruz. Reklam filmleri, kurumsal tanıtım videoları, ürün lansmanları, etkinlik çekimleri ve marka filmleri üretiyoruz. Profesyonel kamera ekipmanları, ışık setleri ve ses kayıt sistemleri ile sinema kalitesinde çekim yapıyoruz. Lokasyon keşfi, oyuncu castingi ve set tasarımı dahil pre-prodüksiyon sürecini de biz yönetiyoruz.",
    whyUs: "Teknik ekipman kalitemiz sektör standardının üzerinde. Sinematik görüntü yönetimi, profesyonel ses kaydı ve renk düzeltme ile her projede film kalitesi sunuyoruz.",
    idealFor: ["TV reklam filmi ihtiyacı olan markalar", "Kurumsal tanıtım filmi", "Ürün lansmanları", "Etkinlik ve fuar çekimleri", "Müzik klipleri"],
    features: [
      { title: "Reklam Filmi", text: "TV ve dijital platformlar için sinematik reklam filmleri. Konseptten yayına kadar full servis." },
      { title: "Tanıtım Filmi", text: "Kurumsal tanıtım, ürün lansmanı ve marka filmleri. Hikayenizi etkileyici şekilde anlatıyoruz." },
      { title: "Fotoğraf Çekimi", text: "Ürün, mekan, portre ve etkinlik fotoğrafçılığı. Profesyonel stüdyo ve dış mekan çekimleri." },
      { title: "Müzik & Ses", text: "Orijinal müzik, seslendirme ve ses tasarımı ile projenizi tamamlıyoruz." },
    ],
    process: [
      { step: "Pre-Prodüksiyon", desc: "Senaryo, storyboard, lokasyon keşfi, casting ve ekip planlama." },
      { step: "Çekim", desc: "Profesyonel ekip ve ekipmanla set çekimi." },
      { step: "Post-Prodüksiyon", desc: "Kurgu, renk düzeltme, VFX, ses tasarımı ve müzik." },
      { step: "Teslimat", desc: "Farklı platformlar için optimize edilmiş final çıktılar." },
    ],
    faqs: [
      { q: "Bir reklam filmi ne kadar sürede hazır olur?", a: "Projenin kapsamına göre 2-6 hafta arası sürer. Acil projeler için hızlandırılmış süreçlerimiz var." },
      { q: "Çekim lokasyonunu siz mi belirliyorsunuz?", a: "Lokasyon keşfi ve önerisi bizden, final karar birlikte verilir. Stüdyo çekimleri için partnerimiz var." },
      { q: "Ekipman kiralamak gerekir mi?", a: "Hayır, tüm ekipman (kamera, ışık, ses) bizim bünyemizde. Ekstra maliyet yok." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80",
    ],
    testimonials: [
      { name: "Burak Özkan", title: "CEO, Arkitekt Studio", text: "Kurumsal tanıtım filmimiz muhteşem oldu. Sinema kalitesinde bir iş çıkardılar." },
      { name: "Mehmet Yılmaz", title: "Pazarlama Direktörü, TechVista", text: "Reklam filmimiz TV'de yayınlandı ve 1M+ YouTube görüntülenme aldı. Profesyonellik seviyesi çok yüksek." },
    ],
    bannerText: "Hikayenizi sinematik kalitede anlatın. Profesyonel prodüksiyonla fark yaratın.",
    seoText: "Ankara prodüksiyon şirketi Humor Creative, reklam filmi çekimi, kurumsal tanıtım filmi, ürün tanıtım videosu, marka filmi, etkinlik çekimi ve profesyonel fotoğraf çekimi alanlarında hizmet vermektedir. Profesyonel kamera ekipmanları, sinematik görüntü yönetimi, lokasyon keşfi, oyuncu castingi, ses kayıt ve post-prodüksiyon dahil uçtan uca prodüksiyon hizmeti sunmaktayız. Ankara reklam filmi çekimi, tanıtım filmi Ankara, kurumsal video prodüksiyon Ankara arayanlar için Humor Creative güvenilir çözüm ortağıdır.",
  },
  {
    slug: "video-kurgulama",
    icon: Video,
    title: "Video Kurgulama",
    shortDesc: "Montaj, color grading, motion",
    heroImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    keywords: ["Montaj", "Color Grading", "Motion Graphics"],
    description: "Etkileyici kurguyla hikâyenizi anlatıyoruz. Post-prodüksiyonda her kareyi mükemmelleştiriyoruz.",
    longDescription: "Ham çekim dosyalarınızı etkileyici bir hikayeye dönüştürüyoruz. Profesyonel montaj, sinematik color grading, motion graphics, alt yazı, ses düzenleme ve VFX hizmetleri sunuyoruz. Adobe Premiere Pro, DaVinci Resolve ve After Effects ile çalışıyoruz. Sosyal medya Reels'inden uzun metraj belgesele kadar her formatta kurgu yapıyoruz.",
    whyUs: "Sadece kesip yapıştırmıyoruz; her projede hikaye anlatımı, tempo ve duygusal etki odaklı çalışıyoruz. Hızlı teslimat ve sınırsız format desteği sunuyoruz.",
    idealFor: ["Çekim dosyalarını profesyonelce kurgulatmak isteyenler", "YouTube ve podcast içerik üreticileri", "Kurumsal video projeleri", "Düğün ve etkinlik videoları"],
    features: [
      { title: "Montaj", text: "Profesyonel kurgu ile akıcı ve etkileyici hikâye anlatımı. Tempo ve ritim yönetimi." },
      { title: "Color Grading", text: "DaVinci Resolve ile sinematik renk düzeltme ve look oluşturma." },
      { title: "Motion Graphics", text: "After Effects ile animasyon, infografik, logo reveal ve alt yazı." },
      { title: "Ses Tasarımı", text: "Ses düzenleme, foley, müzik seçimi ve seslendirme entegrasyonu." },
    ],
    process: [
      { step: "Dosya Transferi", desc: "Çekim dosyalarını güvenli şekilde teslim alıyoruz." },
      { step: "Rough Cut", desc: "İlk kurgu versiyonunu hazırlıyoruz." },
      { step: "Fine Cut", desc: "Geri bildirime göre detay düzenlemeleri, efektler ve motion graphics." },
      { step: "Final", desc: "Color grading, ses mixi ve istenilen formatlarda export." },
    ],
    faqs: [
      { q: "Hangi formatlarda dosya kabul ediyorsunuz?", a: "Tüm yaygın video formatlarını kabul ediyoruz: MP4, MOV, MXF, RAW dosyalar vb." },
      { q: "Teslimat süresi ne kadar?", a: "Basit kurgular 2-3 iş günü, kapsamlı projeler 1-2 hafta sürer." },
      { q: "Müzik lisansı dahil mi?", a: "Royalty-free müzik kütüphanemiz dahildir. Özel müzik prodüksiyonu ayrıca fiyatlandırılır." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    ],
    testimonials: [
      { name: "Can Demir", title: "Etkinlik Müdürü, SoundWave", text: "Aftermovie kurgusu muazzamdı. Festivalin enerjisini mükemmel yansıttılar." },
      { name: "Selin Aydın", title: "İletişim Uzmanı, NovaTech", text: "Video kurgulama hızları ve kalitesi inanılmaz. Reels editlerinden uzun metraj projeye kadar her işi yapıyorlar." },
    ],
    bannerText: "Ham görüntülerinizi etkileyici hikayelere dönüştürüyoruz. Profesyonel kurgu farkını yaşayın.",
    seoText: "Ankara video kurgulama ve montaj hizmeti sunan Humor Creative, profesyonel video kurgu, sinematik color grading, motion graphics, animasyon, alt yazı ekleme, ses düzenleme ve VFX alanlarında uzman ekibiyle hizmet vermektedir. Adobe Premiere Pro, DaVinci Resolve ve After Effects ile çalışan ekibimiz, sosyal medya Reels kurgusundan uzun metraj belgesele kadar her formatta profesyonel kurgu hizmeti sunmaktadır. Ankara video montaj, color grading Ankara, motion graphics ajansı Ankara arayanlar için Humor Creative doğru adrestir.",
  },
  {
    slug: "drone-cekimi",
    icon: Plane,
    title: "Drone Çekimi",
    shortDesc: "8K aerial, havadan görüntüleme",
    heroImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1506947411487-a56738b8ee8b?w=800&q=80",
    keywords: ["8K Aerial", "Havadan Görüntüleme", "Emlak & İnşaat"],
    description: "Havadan çekimlerle farklı bir perspektif sunuyoruz. Profesyonel pilot ekibimizle her açıdan görüntüleme.",
    longDescription: "SHGM lisanslı profesyonel drone pilotlarımız ile 8K çözünürlükte havadan görüntüleme hizmeti sunuyoruz. Emlak, inşaat, turizm, etkinlik, tarım ve enerji sektörlerinde deneyimliyiz. DJI Inspire 3 ve Mavic 3 Pro gibi üst segment ekipmanlarla çalışıyoruz. FPV drone ile aksiyon çekimleri de yapabiliyoruz.",
    whyUs: "Lisanslı ve deneyimli pilot kadromuz, üst segment ekipmanlarımız ve sektör çeşitliliğimizdeki tecrübemiz ile fark yaratıyoruz.",
    idealFor: ["Emlak ve inşaat firmaları", "Turizm ve otelcilik", "Etkinlik ve festival organizasyonları", "Tarım ve enerji sektörü", "Tanıtım filmleri"],
    features: [
      { title: "8K Çözünürlük", text: "DJI Inspire 3 ile ultra yüksek çözünürlükte sinematik havadan görüntüleme." },
      { title: "FPV Drone", text: "Aksiyon ve hız dolu çekimler için FPV drone hizmeti." },
      { title: "Lisanslı Pilotlar", text: "SHGM lisanslı, sigortalı profesyonel drone pilotları." },
      { title: "Gece Çekimi", text: "Özel ekipmanlarla düşük ışık ve gece havadan çekimleri." },
    ],
    process: [
      { step: "Planlama", desc: "Uçuş rotası, izinler, hava durumu ve güvenlik planlaması." },
      { step: "Çekim", desc: "Profesyonel ekipmanlarla havadan görüntüleme." },
      { step: "Düzenleme", desc: "Stabilizasyon, renk düzeltme ve kurgu." },
      { step: "Teslimat", desc: "İstenilen formatlarda çıktı ve ham dosya teslimi." },
    ],
    faqs: [
      { q: "Drone çekimi için izin gerekiyor mu?", a: "SHGM izinlerini biz alıyoruz. Yasak bölgelerde özel izin süreci gerekebilir." },
      { q: "Kötü havada çekim yapılabilir mi?", a: "Güvenlik önceliğimiz. Rüzgar ve yağmur durumuna göre çekim ertelenebilir." },
      { q: "Ham dosyalar da teslim ediliyor mu?", a: "Evet, istenirse ham drone dosyaları da teslim edilir." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
      "https://images.unsplash.com/photo-1506947411487-a56738b8ee8b?w=800&q=80",
      "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&q=80",
    ],
    testimonials: [
      { name: "Burak Özkan", title: "CEO, Arkitekt Studio", text: "Mimari projelerimizin drone çekimleri harika oldu. 8K kalite ve profesyonel pilotlarla çalışmak büyük avantaj." },
      { name: "Elif Başaran", title: "Marka Müdürü, GreenPeak", text: "Fabrika tanıtımımız için drone çekimi yaptırdık. Sonuç beklentimizin çok üzerindeydi." },
    ],
    bannerText: "Projenize kuşbakışı bakın. 8K drone çekimleriyle farklı bir perspektif kazanın.",
    seoText: "Ankara drone çekimi hizmeti sunan Humor Creative, SHGM lisanslı profesyonel drone pilotlarıyla 8K havadan görüntüleme, FPV drone çekimi, emlak drone çekimi, inşaat takip çekimi, etkinlik havadan görüntüleme ve tanıtım filmi drone çekimi alanlarında hizmet vermektedir. DJI Inspire 3 ve Mavic 3 Pro ekipmanlarıyla çalışan ekibimiz, emlak, inşaat, turizm, etkinlik ve enerji sektörlerinde deneyimlidir. Ankara drone çekimi, havadan görüntüleme Ankara, 8K aerial çekim Ankara arayanlar için Humor Creative güvenilir çözüm ortağıdır.",
  },
  {
    slug: "canli-yayin",
    icon: Radio,
    title: "Canlı Yayın",
    shortDesc: "Multi-kamera, streaming, etkinlik",
    heroImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    keywords: ["Multi-Kamera", "Streaming", "Etkinlik Yayını"],
    description: "Profesyonel canlı yayın hizmeti. Etkinliklerinizi geniş kitlelere ulaştırıyoruz.",
    longDescription: "Konferanslar, seminerler, konserler, ödül törenleri, ürün lansmanları ve kurumsal etkinlikler için profesyonel canlı yayın hizmeti sunuyoruz. Multi-kamera setup, profesyonel ses sistemi, grafik overlay, alt yazı ve eş zamanlı çoklu platform yayını yapabiliyoruz. YouTube, Instagram, LinkedIn, Facebook ve özel platformlara aynı anda yayın mümkün.",
    whyUs: "Canlı yayında hata affedilmez. Deneyimli teknik ekibimiz ve yedekli altyapımız ile kesintisiz, profesyonel yayın garantisi veriyoruz.",
    idealFor: ["Kurumsal etkinlikler", "Konferans ve seminerler", "Konser ve festivaller", "Ürün lansmanları", "Online eğitim ve webinarlar"],
    features: [
      { title: "Multi-Kamera", text: "4'e kadar kamera açısı ile profesyonel canlı yayın ve geçiş yönetimi." },
      { title: "Çoklu Platform", text: "YouTube, Instagram, LinkedIn ve özel platformlara eş zamanlı streaming." },
      { title: "Grafik Overlay", text: "Logo, alt yazı, sponsor görselleri ve canlı anket entegrasyonu." },
      { title: "Teknik Altyapı", text: "Profesyonel ses, ışık, prompter ve yedek internet bağlantısı." },
    ],
    process: [
      { step: "Keşif", desc: "Mekan inceleme, internet altyapısı ve teknik ihtiyaç analizi." },
      { step: "Kurulum", desc: "Kamera, ses, ışık, streaming encoder ve grafik sistemleri kurulumu." },
      { step: "Yayın", desc: "Canlı yönetim, kamera geçişleri, ses mixi ve grafik overlay." },
      { step: "Arşiv", desc: "Full HD/4K yayın kaydı, highlight kesimi ve aftermovie opsiyonu." },
    ],
    faqs: [
      { q: "Internet bağlantısını siz mi sağlıyorsunuz?", a: "Mekanın internet altyapısını kullanırız. Yedek olarak 4G/5G bonding cihazımız var." },
      { q: "Kaç platformda aynı anda yayın yapabilirsiniz?", a: "Aynı anda 5'e kadar farklı platformda yayın yapabiliyoruz." },
      { q: "Yayın kaydı veriliyor mu?", a: "Evet, tüm yayınların Full HD/4K kaydı teslim edilir." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    ],
    testimonials: [
      { name: "Can Demir", title: "Etkinlik Müdürü, SoundWave", text: "Festival canlı yayınımızı Humor yaptı. 500K+ izlenme ve sıfır teknik aksaklık. Mükemmel profesyonellik." },
      { name: "Mehmet Yılmaz", title: "Pazarlama Direktörü, TechVista", text: "Ürün lansmanımızı 3 platforma aynı anda canlı yayınladılar. Teknik altyapıları çok güçlü." },
    ],
    bannerText: "Etkinliklerinizi dünyaya açın. Profesyonel canlı yayınla kitlenizi büyütün.",
    seoText: "Ankara canlı yayın hizmeti sunan Humor Creative, multi-kamera canlı yayın, kurumsal etkinlik streaming, konferans canlı yayını, konser yayını, ürün lansmanı canlı yayını ve webinar teknik altyapısı alanlarında profesyonel hizmet vermektedir. YouTube, Instagram, LinkedIn ve özel platformlara eş zamanlı streaming, grafik overlay, alt yazı entegrasyonu ve yedekli internet altyapısı dahil tam teknik destek sunmaktayız. Ankara canlı yayın, etkinlik streaming Ankara, multi-kamera yayın hizmeti arayanlar için Humor Creative doğru adrestir.",
  },
  {
    slug: "senaryo-yazimi",
    icon: FileText,
    title: "Senaryo Yazımı",
    shortDesc: "Kreatif brief, storyboard, script",
    heroImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80",
    aboutImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
    keywords: ["Kreatif Brief", "Storyboard", "Script"],
    description: "Markanız için özgün senaryo ve hikâye geliştirme. Fikirden üretime kadar yaratıcı sürecin tamamı.",
    longDescription: "Her başarılı video projesinin arkasında güçlü bir senaryo vardır. Reklam filmleri, tanıtım videoları, sosyal medya serileri ve kurumsal filmler için profesyonel senaryo yazımı hizmeti sunuyoruz. Markanızın mesajını, hedef kitlenizin dilini ve platformun gereksinimlerini bilen senaristlerimiz, etkili ve akılda kalıcı hikayeler yazıyor.",
    whyUs: "Senaristlerimiz hem reklam hem sinema deneyimine sahip. Markanızın sesini bilen, hedef kitlenize hitap eden ve üretim sürecini anlayan senaryolar yazıyoruz.",
    idealFor: ["Reklam filmi çekecek markalar", "Sosyal medya video serileri", "Kurumsal tanıtım projeleri", "YouTube ve podcast içerik üreticileri"],
    features: [
      { title: "Kreatif Brief", text: "Proje hedeflerini, mesajı ve tone of voice'u netleştiren stratejik brief." },
      { title: "Konsept Geliştirme", text: "Birden fazla yaratıcı konsept ve yaklaşım sunuyoruz." },
      { title: "Storyboard", text: "Sahne sahne görsel planlama ile çekim öncesi tam netlik." },
      { title: "Script Yazımı", text: "Profesyonel diyalog, voiceover ve sahne yönergeleri." },
    ],
    process: [
      { step: "Bilgilendirme", desc: "Marka, ürün, hedef kitle ve projenin amacı hakkında detaylı bilgi toplama." },
      { step: "Fikir Geliştirme", desc: "Birden fazla konsept ve yaklaşım sunuyoruz." },
      { step: "Yazım", desc: "Seçilen konsepti detaylı senaryoya dönüştürüyoruz." },
      { step: "Finalizasyon", desc: "Geri bildirime göre revize edip çekim ekibine teslim." },
    ],
    faqs: [
      { q: "Senaryo yazımı ne kadar sürer?", a: "Basit projeler 3-5 iş günü, kapsamlı projeler 1-2 hafta sürer." },
      { q: "Kaç revizyon hakkım var?", a: "Standart 2 revizyon hakkınız var. Ek revizyonlar ayrıca fiyatlandırılır." },
      { q: "Sadece senaryo mu yoksa prodüksiyon da dahil mi?", a: "Sadece senaryo yazımı da sunuyoruz. Prodüksiyonu da biz yapabiliriz — entegre paketlerimiz var." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
      "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&q=80",
    ],
    testimonials: [
      { name: "Burak Özkan", title: "CEO, Arkitekt Studio", text: "Tanıtım filmimizin senaryosu tam istediğimiz gibi oldu. Marka mesajımızı mükemmel yansıttılar." },
      { name: "Elif Başaran", title: "Marka Müdürü, GreenPeak", text: "Lansman kampanyamızın kreatif konseptini Humor geliştirdi. Storyboard'dan çekime kadar kusursuz bir süreç." },
    ],
    bannerText: "Her büyük projenin arkasında güçlü bir senaryo vardır. Hikayenizi yazalım.",
    seoText: "Ankara senaryo yazımı hizmeti sunan Humor Creative, reklam filmi senaryosu, tanıtım videosu scripti, sosyal medya video serileri senaryosu, kurumsal film senaryosu, storyboard hazırlama ve kreatif brief oluşturma alanlarında profesyonel hizmet vermektedir. Deneyimli senaristlerimiz, markanızın mesajını hedef kitlenizin dilinde aktaran etkili ve akılda kalıcı hikayeler yazıyor. Ankara senaryo yazımı, reklam senaryosu Ankara, storyboard hazırlama hizmeti, kreatif ajans Ankara arayanlar için Humor Creative doğru çözüm ortağıdır.",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
