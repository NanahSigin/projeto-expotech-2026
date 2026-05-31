import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Colecoes from "@/components/Colecoes";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#faf7f2", color: "#2c1f0e" }}>
      <Hero />
      <Stats />
      <Colecoes />
      <Products />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
