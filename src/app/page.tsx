import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import ServicesCarousel from "@/components/ServicesCarousel";
import Stats from "@/components/Stats";
// 'Yaptığımız İşler' bölümü geçici olarak gizlendi
// import HomeWork from "@/components/HomeWork";
import Testimonials from "@/components/Testimonials";
import HomeCTA from "@/components/HomeCTA";
import SeoText from "@/components/SeoText";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <ServicesCarousel />
      <Stats />
      {/* <HomeWork /> */}
      <Testimonials />
      <HomeCTA />
      <SeoText />
    </>
  );
}
