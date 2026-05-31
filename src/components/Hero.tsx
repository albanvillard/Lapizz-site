"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // 1. État pour corriger l'erreur d'hydratation liée au Math.random()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP animation for content entry
  useEffect(() => {
    // Si le composant n'est pas encore monté, on ne lance pas GSAP tout de suite
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-start pt-32 pb-20 overflow-hidden px-6 md:px-16 bg-transparent"
    >
      {/* Premium ambient copper glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-terracotta-950/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gold-950/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating high-end visual embers - CORRIGÉ AVEC isMounted */}
      {isMounted && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-terracotta-500 rounded-full opacity-35 pointer-events-none"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            opacity: [0.15, 0.55, 0.15],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="mx-auto max-w-6xl w-full z-10 relative">
        <div className="flex flex-col text-left space-y-8 max-w-4xl">

          {/* Badge: Gold/Copper borders */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gold-500/25 bg-gold-500/[0.03] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300 font-sans font-bold">
              DARK KITCHEN ARTISANALE - LYON
            </span>
          </div>

          {/* Compact Main Title with perfect tight line breaks */}
          <div className="space-y-4">
            <h1
              ref={titleRef}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight text-stone-100 leading-[1.05] opacity-0 flex flex-col"
            >
              <span>L'Édition Haute Couture</span>
              <span>de la Pizza <span className="bg-gradient-to-r from-terracotta-400 via-terracotta-500 to-terracotta-600 bg-clip-text text-transparent font-serif italic font-normal">Napolitaine</span></span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl font-sans font-light leading-relaxed opacity-0"
          >
            Découvrez une expérience sensorielle inédite signée <strong>Maracuja Bella Vita</strong>.
            Une confection confidentielle où la pâte au levain naturel mûrie 72 heures s'allie
            aux ingrédients les plus prestigieux de Campanie pour façonner l'excellence culinaire.
          </p>

          {/* WhatsApp CTA with glow hover effect */}
          <div ref={ctaRef} className="flex flex-wrap gap-5 pt-4 opacity-0">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/33600000000?text=Bonjour%20Maracuja%20Bella%20Vita,%20je%20souhaite%20commander%20une%20cr%C3%A9ation%20d'exception%20!"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4.5 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-400 hover:to-terracotta-500 text-white font-sans text-xs uppercase tracking-[0.2em] font-black transition-all duration-300 hover:shadow-[0_0_35px_rgba(214,90,49,0.35)]"
            >
              <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:rotate-6" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.472 4.97 1.473 5.485.002 9.948-4.468 9.95-9.953.003-2.646-1.02-5.133-2.88-6.995C16.829 1.815 14.35 .793 11.99 1.791c-5.498 0-9.96 4.46-9.962 9.948-.001 1.796.481 3.486 1.48 4.971l-.973 3.551 3.622-.95zM15.768 11.5c-.29-.145-1.716-.848-1.98-.943-.266-.096-.459-.144-.652.146-.19.29-.74.943-.907 1.134-.167.19-.335.213-.625.069-.29-.145-1.225-.452-2.333-1.442-.862-.77-1.444-1.72-1.614-2.01-.17-.29-.018-.448.127-.592.13-.13.29-.339.435-.508.145-.169.193-.29.29-.483.097-.19.048-.362-.024-.508-.073-.145-.652-1.573-.893-2.153-.235-.566-.475-.489-.652-.498-.168-.008-.362-.01-.555-.01s-.508.073-.773.362c-.266.29-1.014.99-1.014 2.415 0 1.425 1.038 2.802 1.182 2.996.145.195 2.042 3.118 4.948 4.372.69.298 1.23.476 1.65.61.693.22 1.325.19 1.823.115.556-.084 1.716-.7 1.961-1.376.246-.677.246-1.256.173-1.376-.073-.12-.266-.192-.556-.337z" />
              </svg>
              Commander via WhatsApp
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, border: "1px solid rgba(223, 168, 74, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              href="#menu"
              className="px-8 py-4.5 rounded-xl border border-gold-500/20 bg-gold-500/5 text-gold-300 hover:text-stone-100 font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
            >
              Notre Carte
            </motion.a>
          </div>

        </div>
      </div>

      {/* Discrete Edition Badge in bottom-left corner */}
      <div className="absolute bottom-8 left-6 md:left-16 z-30 flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-stone-800/40 bg-stone-900/10 backdrop-blur-md text-[9px] uppercase tracking-[0.25em] text-stone-400 font-bold font-sans">
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-pulse" />
        <span>N°1 Issue : Le Pâton Sacré</span>
      </div>
    </section>
  );
}