import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PizzaEvolution from "@/components/PizzaEvolution";
import PizzaMenu from "@/components/PizzaMenu";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Section 1: Hero Section with bold Serif headers and WhatsApp CTA */}
        <Hero />

        {/* Section 2: Interactive GSAP ScrollTrigger Pizza Baking evolution */}
        <PizzaEvolution />

        {/* Section 3: Static 3-column CSS Gourmet Pizza Grid with WhatsApp Ordering */}
        <PizzaMenu />
      </main>
      <Footer />
    </>
  );
}
