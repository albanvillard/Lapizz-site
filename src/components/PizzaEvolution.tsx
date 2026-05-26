"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "01",
    title: "Le Pâton Sacré",
    subtitle: "Mûrissement de 72 heures",
    desc: "Notre pâte repose durant trois jours complets. Élaborée à partir d'un levain naturel secret et de farine de blé tendre de type 00, elle développe une digestibilité incomparable et des arômes subtils de noisette sauvage.",
  },
  {
    num: "02",
    title: "L'Étalage & La Tomate",
    subtitle: "Stirata traditionnelle & Sauce DOP",
    desc: "Le pâton est étiré exclusivement à la main par notre pizzaïolo, repoussant l'air vers les bords pour créer la fameuse 'corniche'. Il est ensuite nappé d'une sauce tomate veloutée à base de tomates San Marzano DOP cultivées au pied du Vésuve.",
  },
  {
    num: "03",
    title: "Le Garnissage d'Exception",
    subtitle: "Matières premières d'origine protégée",
    desc: "Nous ajoutons des cubes fondants de Fior di Latte d'Agerola, des tranches crémeuses de Mozzarella di Bufala Campana AOP, des feuilles de basilic frais cueillies le matin même et un filet d'huile d'olive extra-vierge biologique.",
  },
  {
    num: "04",
    title: "La Flamme du Vésuve",
    subtitle: "Cuisson volcanique à 485°C",
    desc: "Saisie pendant exactement 60 secondes dans notre four à bois en pierre volcanique, la pâte lève instantanément. Les bords se parent de leurs célèbres taches léopard caramélisées, le fromage fond et le basilic libère toutes ses essences.",
  },
];

export default function PizzaEvolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Pizza states refs
  const state1Ref = useRef<HTMLDivElement>(null);
  const state2Ref = useRef<HTMLDivElement>(null);
  const state3Ref = useRef<HTMLDivElement>(null);
  const state4Ref = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const pin = triggerRef.current;
    if (!pin) return;

    const ctx = gsap.context(() => {
      // 1. Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Self.progress goes from 0 to 1
            // Determine active step index (0 to 3)
            const step = Math.min(Math.floor(self.progress * 4), 3);
            setActiveStep(step);
          },
        },
      });

      // 2. Animate States Opacity and Scale on Scroll
      // Transition State 1 to 2
      tl.to(state1Ref.current, { opacity: 0, scale: 0.9, duration: 1 })
        .to(state2Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        
        // Transition State 2 to 3
        .to(state2Ref.current, { opacity: 0, scale: 0.9, duration: 1 })
        .to(state3Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        
        // Transition State 3 to 4
        .to(state3Ref.current, { opacity: 0, scale: 0.9, duration: 1 })
        .to(state4Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<");

      // 3. Animate text transition
      const textBlocks = gsap.utils.toArray(".evolution-text-block");
      textBlocks.forEach((block: any, i: number) => {
        gsap.set(block, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
      });

      // Sync text block fade in/out with current state based on activeStep
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="relative h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terracotta-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-12 relative z-10">
        
        {/* Left Column: Descriptive Story (Sticky Texts) */}
        <div className="lg:col-span-5 h-[350px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 text-xs uppercase tracking-[0.3em] text-terracotta-500 font-bold font-sans mb-2">
            Le Rituel de Préparation
          </div>
          
          <div className="relative w-full h-full flex items-center">
            {STEPS.map((step, idx) => (
              <div
                key={step.num}
                className={`absolute inset-0 flex flex-col justify-center space-y-4 transition-all duration-700 ease-out ${
                  activeStep === idx 
                    ? "opacity-100 transform translate-y-0 pointer-events-auto" 
                    : "opacity-0 transform -translate-y-8 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-5xl md:text-6xl font-bold bg-gradient-to-r from-terracotta-400 to-terracotta-600 bg-clip-text text-transparent opacity-40">
                    {step.num}
                  </span>
                  <div className="h-[1px] w-12 bg-terracotta-500/30" />
                  <span className="text-xs uppercase tracking-widest text-anthracite-400 font-sans">
                    {step.subtitle}
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-anthracite-50">
                  {step.title}
                </h3>
                
                <p className="text-anthracite-300 text-sm md:text-base leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-0 left-0 flex gap-2.5">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeStep === idx ? "w-8 bg-terracotta-500" : "w-2 bg-anthracite-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Visual Pizza Evolution */}
        <div className="lg:col-span-7 flex justify-center items-center h-full relative">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] aspect-square rounded-full flex items-center justify-center p-8">
            
            {/* Ambient circular frame overlay */}
            <div className="absolute inset-0 rounded-full border border-dashed border-terracotta-500/10 pointer-events-none animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-terracotta-500/5 pointer-events-none" />

            {/* STATE 1: Le Pâton Sacré */}
            <div
              ref={state1Ref}
              className="absolute w-[70%] h-[70%] rounded-full bg-gradient-to-br from-[#f8f6f0] to-[#e4dec9] shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.1),_0_20px_40px_rgba(0,0,0,0.3)] transition-transform duration-500 flex items-center justify-center"
              style={{ opacity: activeStep === 0 ? 1 : 0 }}
            >
              {/* Soft flour dust texture representation */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(transparent_50%,_rgba(255,255,255,0.4))] opacity-80" />
              <div className="text-[10px] uppercase tracking-widest text-[#a89d7b]/60 font-sans font-semibold">
                Levain 72h
              </div>
            </div>

            {/* STATE 2: L'Étalage & La Tomate */}
            <div
              ref={state2Ref}
              className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-br from-[#f1ebd6] to-[#d8cca5] shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-500 flex items-center justify-center overflow-hidden"
              style={{ opacity: activeStep === 1 ? 1 : 0, transform: activeStep === 1 ? "scale(1)" : "scale(0.9)" }}
            >
              {/* Dough crust line */}
              <div className="absolute inset-2.5 rounded-full border-[12px] border-[#e7ddbe] shadow-inner" />
              
              {/* Sauce Tomate Center */}
              <div className="absolute inset-7 rounded-full bg-gradient-to-tr from-[#991b1b] via-[#dc2626] to-[#b91c1c] shadow-[inset_0_4px_12px_rgba(0,0,0,0.2)] flex items-center justify-center">
                {/* Spiral swirl representing spoon application */}
                <svg className="w-full h-full opacity-35 stroke-[#7f1d1d] fill-none" viewBox="0 0 100 100">
                  <path d="M50,50 C60,40 40,30 30,50 C20,70 80,70 70,40 C60,10 20,20 15,60" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* STATE 3: Le Garnissage Gourmet */}
            <div
              ref={state3Ref}
              className="absolute w-[88%] h-[88%] rounded-full bg-gradient-to-br from-[#f1ebd6] to-[#d8cca5] shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-500 flex items-center justify-center overflow-hidden"
              style={{ opacity: activeStep === 2 ? 1 : 0, transform: activeStep === 2 ? "scale(1)" : "scale(0.9)" }}
            >
              {/* Crust */}
              <div className="absolute inset-2.5 rounded-full border-[12px] border-[#e7ddbe] shadow-inner" />
              
              {/* Sauce */}
              <div className="absolute inset-7 rounded-full bg-gradient-to-tr from-[#991b1b] via-[#dc2626] to-[#b91c1c]">
                
                {/* Mozzarella chunks */}
                <div className="absolute top-[20%] left-[30%] w-8 h-6 bg-white/95 rounded-md rotate-[12deg] shadow-md border border-[#e2e8f0]" />
                <div className="absolute top-[45%] left-[15%] w-9 h-7 bg-white/95 rounded-lg rotate-[-25deg] shadow-md border border-[#e2e8f0]" />
                <div className="absolute top-[60%] left-[45%] w-8 h-6 bg-white/95 rounded-md rotate-[40deg] shadow-md border border-[#e2e8f0]" />
                <div className="absolute top-[35%] right-[20%] w-9 h-6 bg-white/95 rounded-lg rotate-[-15deg] shadow-md border border-[#e2e8f0]" />
                <div className="absolute bottom-[20%] right-[30%] w-7 h-5 bg-white/95 rounded-md rotate-[50deg] shadow-md border border-[#e2e8f0]" />
                
                {/* Basil leaves */}
                <div className="absolute top-[28%] left-[50%] w-8 h-4 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-ellipse rotate-[-45deg] shadow-sm flex items-center justify-center">
                  <div className="w-[80%] h-[1px] bg-[#22c55e] opacity-40" />
                </div>
                <div className="absolute bottom-[35%] left-[25%] w-9 h-5 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-ellipse rotate-[60deg] shadow-sm flex items-center justify-center">
                  <div className="w-[80%] h-[1px] bg-[#22c55e] opacity-40" />
                </div>
                <div className="absolute top-[50%] right-[30%] w-8 h-4 bg-gradient-to-br from-[#15803d] to-[#166534] rounded-ellipse rotate-[15deg] shadow-sm flex items-center justify-center">
                  <div className="w-[80%] h-[1px] bg-[#22c55e] opacity-40" />
                </div>
              </div>
            </div>

            {/* STATE 4: La Flamme du Vésuve */}
            <div
              ref={state4Ref}
              className="absolute w-[90%] h-[90%] rounded-full bg-gradient-to-br from-[#c28448] via-[#854d19] to-[#3a1d04] shadow-[0_20px_50px_rgba(214,90,49,0.25)] transition-transform duration-500 flex items-center justify-center overflow-hidden"
              style={{ opacity: activeStep === 3 ? 1 : 0, transform: activeStep === 3 ? "scale(1)" : "scale(0.9)" }}
            >
              {/* Baked Leopard crust */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(transparent_70%,_rgba(0,0,0,0.6))]" />
              
              {/* Leopard Char spots */}
              <div className="absolute top-[10%] left-[30%] w-4 h-3 bg-[#1e0f02] rounded-full blur-[0.5px] opacity-90" />
              <div className="absolute top-[40%] left-[8%] w-5 h-3 bg-[#1e0f02] rounded-full blur-[0.5px] opacity-95" />
              <div className="absolute bottom-[20%] left-[25%] w-3 h-4 bg-[#1e0f02] rounded-full blur-[0.5px] opacity-90" />
              <div className="absolute top-[25%] right-[12%] w-4 h-4 bg-[#1e0f02] rounded-full blur-[0.5px] opacity-95" />
              <div className="absolute bottom-[35%] right-[10%] w-3 h-2 bg-[#1e0f02] rounded-full blur-[0.5px] opacity-90" />
              <div className="absolute bottom-[10%] right-[40%] w-5 h-3 bg-[#1e0f02] rounded-full blur-[0.5px] opacity-95" />

              {/* Melted Cheese & Bubbles in Tomato base */}
              <div className="absolute inset-7 rounded-full bg-gradient-to-tr from-[#991b1b] via-[#dc2626] to-[#b91c1c] shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)]">
                
                {/* Charred baked spots in tomato */}
                <div className="absolute top-[35%] left-[45%] w-2 h-2 bg-[#450a0a] rounded-full opacity-65" />
                <div className="absolute bottom-[40%] right-[35%] w-2 h-2 bg-[#450a0a] rounded-full opacity-65" />

                {/* Melted bubbly cheese */}
                <div className="absolute top-[18%] left-[26%] w-10 h-8 bg-gradient-to-br from-[#fffdf5] to-[#fef08a] rounded-full rotate-[12deg] shadow-inner opacity-90 blur-[0.5px]" />
                <div className="absolute top-[42%] left-[12%] w-12 h-9 bg-gradient-to-br from-[#fffdf5] to-[#fef08a] rounded-full rotate-[-25deg] shadow-inner opacity-90 blur-[0.5px]" />
                <div className="absolute top-[58%] left-[42%] w-11 h-8 bg-gradient-to-br from-[#fffdf5] to-[#fef08a] rounded-full rotate-[40deg] shadow-inner opacity-90 blur-[0.5px]" />
                <div className="absolute top-[32%] right-[16%] w-12 h-8 bg-gradient-to-br from-[#fffdf5] to-[#fef08a] rounded-full rotate-[-15deg] shadow-inner opacity-90 blur-[0.5px]" />
                <div className="absolute bottom-[16%] right-[26%] w-9 h-7 bg-gradient-to-br from-[#fffdf5] to-[#fef08a] rounded-full rotate-[50deg] shadow-inner opacity-90 blur-[0.5px]" />
                
                {/* Baked Basil leaves */}
                <div className="absolute top-[28%] left-[50%] w-8 h-4 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-ellipse rotate-[-45deg] opacity-90 shadow-inner flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/10 rounded-full" />
                </div>
                <div className="absolute bottom-[35%] left-[25%] w-9 h-5 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-ellipse rotate-[60deg] opacity-90 shadow-inner flex items-center justify-center" />
                <div className="absolute top-[50%] right-[30%] w-8 h-4 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-ellipse rotate-[15deg] opacity-90 shadow-inner flex items-center justify-center" />
              </div>

              {/* Rising hot steam effect */}
              <div className="absolute inset-4 rounded-full pointer-events-none overflow-hidden mix-blend-screen opacity-20">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8),_transparent_60%)] animate-pulse" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
