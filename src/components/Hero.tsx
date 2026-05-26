"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import logoSvg from "@/assets/logo.svg";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pizzaPlateRef = useRef<HTMLDivElement>(null);

  // GSAP animation for content entry
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 }
      );

      gsap.fromTo(
        pizzaPlateRef.current,
        { opacity: 0, scale: 0.8, rotate: -45 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.5, ease: "elastic.out(1, 0.75)", delay: 0.4 }
      );

      // Continuous slow rotation of the gourmet badge/plate
      gsap.to(pizzaPlateRef.current, {
        rotate: 360,
        duration: 50,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Parallax mouse move effect on the central plate
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pizzaPlateRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate displacement
    const x = (clientX - innerWidth / 2) / 35;
    const y = (clientY - innerHeight / 2) / 35;

    gsap.to(pizzaPlateRef.current, {
      x,
      y,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!pizzaPlateRef.current) return;
    gsap.to(pizzaPlateRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden px-6 bg-slate-stone"
    >
      {/* Ambient Red-Orange Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-terracotta-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-terracotta-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Terracotta Embers */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-terracotta-400 rounded-full opacity-30 pointer-events-none"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        {/* Hero Text Content */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6">
          
          {/* Badge: Brushed Gold styled */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-300 font-sans font-bold">
              DARK KITCHEN ARTISANALE - LYON
            </span>
          </div>

          {/* Compact Main Title with perfect line breaks */}
          <h1
            ref={titleRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#f9f6f0] leading-[1.1] opacity-0 flex flex-col"
          >
            <span>L'Édition Haute Couture de la Pizza</span>
            <span className="bg-gradient-to-r from-terracotta-100 via-terracotta-400 to-terracotta-600 bg-clip-text text-transparent font-serif italic mt-1">
              Napolitaine
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-anthracite-300 text-base md:text-lg max-w-xl font-sans leading-relaxed opacity-0"
          >
            Découvrez une expérience sensorielle inédite où la pâte au levain naturel 
            mûrie 72 heures s'allie aux ingrédients les plus prestigieux de Campanie. 
            Une pizzeria haute couture au cœur de la capitale de la gastronomie.
          </p>

          {/* Call to Actions */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 pt-2 opacity-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/33600000000?text=Bonjour%20L'Oro%20di%20Napoli,%20je%20souhaite%20passer%20une%20commande%20pour%20ce%20soir%20!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-terracotta-400 via-terracotta-500 to-terracotta-600 text-white font-sans text-xs uppercase tracking-widest font-black transition-all shadow-[0_4px_20px_rgba(214,90,49,0.25)] hover:shadow-[0_4px_30px_rgba(214,90,49,0.4)]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 4.97 1.473 5.485.002 9.948-4.468 9.95-9.953.003-2.646-1.02-5.133-2.88-6.995C16.829 1.815 14.35 .793 11.99 1.791c-5.498 0-9.96 4.46-9.962 9.948-.001 1.796.481 3.486 1.48 4.971l-.973 3.551 3.622-.95zM15.768 11.5c-.29-.145-1.716-.848-1.98-.943-.266-.096-.459-.144-.652.146-.19.29-.74.943-.907 1.134-.167.19-.335.213-.625.069-.29-.145-1.225-.452-2.333-1.442-.862-.77-1.444-1.72-1.614-2.01-.17-.29-.018-.448.127-.592.13-.13.29-.339.435-.508.145-.169.193-.29.29-.483.097-.19.048-.362-.024-.508-.073-.145-.652-1.573-.893-2.153-.235-.566-.475-.489-.652-.498-.168-.008-.362-.01-.555-.01s-.508.073-.773.362c-.266.29-1.014.99-1.014 2.415 0 1.425 1.038 2.802 1.182 2.996.145.195 2.042 3.118 4.948 4.372.69.298 1.23.476 1.65.61.693.22 1.325.19 1.823.115.556-.084 1.716-.7 1.961-1.376.246-.677.246-1.256.173-1.376-.073-.12-.266-.192-.556-.337z"/>
              </svg>
              Commander via WhatsApp
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, border: "1px solid rgba(223, 168, 74, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              href="#menu"
              className="px-8 py-4 rounded-xl border border-gold-500/20 bg-gold-500/5 text-gold-300 hover:text-[#f9f6f0] font-sans text-xs uppercase tracking-widest font-bold transition-all"
            >
              Notre Carte
            </motion.a>
          </div>
        </div>

        {/* Hero Central Element: Shiny Orange-Copper Neon Pizza */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={pizzaPlateRef}
            className="relative w-80 h-80 sm:w-[380px] sm:h-[380px] aspect-square rounded-full glass flex items-center justify-center p-8 shadow-[0_0_100px_rgba(234,88,12,0.15)] opacity-0"
          >
            {/* Structural glowing neon rings */}
            <div className="absolute inset-4 rounded-full border border-terracotta-500/20 pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-dashed border-gold-500/10 pointer-events-none animate-[spin_180s_linear_infinite]" />
            
            {/* The actual Neon SVG Logo - glowing brightly */}
            <div className="relative w-full h-full p-2 neon-glow-orange">
              <Image
                src={logoSvg}
                alt="Orange-Copper Pizza Neon Tube Sign"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Glowing neon lettering ring */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_80s_linear_infinite] opacity-60"
              viewBox="0 0 200 200"
            >
              <path
                id="textPath"
                d="M 100, 100 m -82, 0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
                fill="none"
              />
              <text className="font-serif text-[7px] uppercase tracking-[0.27em] fill-gold-400/60">
                <textPath href="#textPath" startOffset="0%">
                  • ARTISANAL ET LEVAIN NATUREL • PIZZERIA HAUTE COUTURE • INGRÉDIENTS AOP DE PREMIER CHOIX • 
                </textPath>
              </text>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
