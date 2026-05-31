"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PizzaEvolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // 1. Preload 240 frames of the pizza evolution
  useEffect(() => {
    const totalFrames = 240;
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    // ASTUCE : Chemin dynamique pour marcher en local ET sur GitHub Pages
    const basePath = process.env.NODE_ENV === 'production' ? '/Lapizz-site' : '';

    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image();
      const frameNum = String(i).padStart(5, "0");

      // On utilise le basePath ici
      img.src = `${basePath}/pizza_image_fin/${frameNum}.png`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress((loadedCount / totalFrames) * 100);
        if (loadedCount === totalFrames) {
          imagesRef.current = tempImages;
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        // En cas d'erreur 404, on ignore silencieusement pour ne pas bloquer le chargement
        loadedCount++;
        setLoadProgress((loadedCount / totalFrames) * 100);
        if (loadedCount === totalFrames) {
          imagesRef.current = tempImages;
          setImagesLoaded(true);
        }
      };

      tempImages.push(img);
    }
  }, []);

  // 2. Set up the Canvas rendering and GSAP scrollytelling timeline
  useEffect(() => {
    if (!imagesLoaded || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set internal resolution of the canvas
    canvas.width = 1080;
    canvas.height = 1080;

    // Drawing helper
    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      // SÉCURITÉ ANTI-CRASH : On vérifie que l'image est bien chargée et non "broken"
      if (img && ctx && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Draw initial frame
    drawFrame(0);

    // Pinning the section and scrubbing the frames
    const mainTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * 240),
          239
        );
        drawFrame(frameIndex);
      },
    });

    // Fading narrative blocks in and out based on scroll progress
    // Left narrative block: Fermentation de 72h
    const leftTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "10% top",
        end: "40% top",
        scrub: true,
      }
    })
      .fromTo(textLeftRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
      .to(textLeftRef.current, { opacity: 0, y: -40 });

    // Right narrative block: Cuisson à 500°C
    const rightTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "50% top",
        end: "80% top",
        scrub: true,
      }
    })
      .fromTo(textRightRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
      .to(textRightRef.current, { opacity: 0, y: -40 });

    return () => {
      mainTrigger.kill();
      leftTrigger.kill();
      rightTrigger.kill();
    };
  }, [imagesLoaded]);

  // Loading Screen
  if (!imagesLoaded) {
    return (
      <div className="relative h-screen w-full bg-[#08080a] flex flex-col items-center justify-center">
        {/* Subtle decorative glowing elements */}
        <div className="absolute w-[400px] h-[400px] bg-terracotta-900/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="space-y-6 text-center z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-terracotta-500 font-bold font-sans block animate-pulse">
            Le Rituel Maracuja
          </span>
          <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-stone-100">
            Préparation de l'Évolution...
          </h3>

          <div className="w-72 h-[2px] bg-stone-900 mx-auto relative overflow-hidden rounded-full">
            <div
              className="absolute h-full bg-gradient-to-r from-terracotta-500 to-gold-400 transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>

          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-mono block">
            Chargement des frames : {Math.round(loadProgress)}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-transparent overflow-hidden select-none border-t border-b border-stone-900"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-950/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Narrative Block Left: Fermentation */}
      <div
        ref={textLeftRef}
        className="absolute left-[5%] md:left-[8%] top-[30%] md:top-[38%] max-w-[280px] md:max-w-[340px] z-20 space-y-4 opacity-0 pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-4xl font-bold bg-gradient-to-r from-terracotta-400 to-terracotta-600 bg-clip-text text-transparent opacity-60">
            01
          </span>
          <div className="h-[1px] w-10 bg-terracotta-500/30" />
          <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold font-sans">
            Maturité du levain
          </span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-stone-100 leading-tight">
          Fermentation de 72h
        </h3>
        <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-sans font-light">
          Notre pâte repose durant trois jours complets. Élaborée à partir d'un levain naturel secret et de farine de blé tendre de type 00, elle développe une digestibilité incomparable et des arômes subtils de noisette sauvage.
        </p>
      </div>

      {/* Canvas - full screen interactive background */}
      <div className="fixed inset-0 w-screen h-screen -z-20 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-60 filter brightness-[0.7] contrast-[1.05]"
        />
        {/* Vignette & premium ambient gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/40 via-transparent to-[#08080a]/40 pointer-events-none" />
      </div>

      {/* Narrative Block Right: Cuisson */}
      <div
        ref={textRightRef}
        className="absolute right-[5%] md:right-[8%] top-[35%] md:top-[42%] max-w-[280px] md:max-w-[340px] z-20 space-y-4 opacity-0 pointer-events-none text-right flex flex-col items-end"
      >
        <div className="flex items-center gap-3 justify-end">
          <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold font-sans">
            Choc thermique
          </span>
          <div className="h-[1px] w-10 bg-terracotta-500/30" />
          <span className="font-serif text-4xl font-bold bg-gradient-to-r from-terracotta-400 to-terracotta-600 bg-clip-text text-transparent opacity-60">
            02
          </span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-stone-100 leading-tight">
          Cuisson à 500°C
        </h3>
        <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-sans font-light">
          Saisie pendant exactement 60 secondes dans notre four à bois en pierre volcanique, la pâte lève instantanément. Les bords se parent de leurs célèbres taches léopard caramélisées, le fromage fond et le basilic libère toutes ses essences.
        </p>
      </div>
    </section>
  );
}