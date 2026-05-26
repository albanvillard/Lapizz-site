"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logoSvg from "@/assets/logo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="reservations" className="relative bg-anthracite-900 border-t border-anthracite-800 pt-20 pb-8 px-6 md:px-12 overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-terracotta-500/30 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-terracotta-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 transition-transform duration-500 group-hover:rotate-12">
                <Image
                  src={logoSvg}
                  alt="L'Oro di Napoli Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-lg font-bold bg-gradient-to-r from-terracotta-100 via-terracotta-400 to-terracotta-600 bg-clip-text text-transparent">
                  MARACUJA BELLA VITA
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-anthracite-400 -mt-1 font-sans">
                  Pizzeria Haute Couture
                </span>
              </div>
            </a>
            <p className="text-anthracite-300 text-xs leading-relaxed font-sans">
              Une immersion totale dans la tradition napolitaine, enrichie de saveurs 
              luxueuses et de matières premières certifiées AOP/IGP.
            </p>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-terracotta-500 uppercase tracking-widest">
              Horaires d'Ouverture
            </h4>
            <ul className="space-y-2 text-xs text-anthracite-300 font-sans">
              <li className="flex justify-between border-b border-anthracite-800 pb-1.5">
                <span>Lundi - Vendredi</span>
                <span className="text-anthracite-100">19:00 - 23:30</span>
              </li>
              <li className="flex justify-between border-b border-anthracite-800 pb-1.5">
                <span>Samedi</span>
                <span className="text-anthracite-100">18:30 - 00:00</span>
              </li>
              <li className="flex justify-between border-b border-anthracite-800 pb-1.5">
                <span>Dimanche</span>
                <span className="text-terracotta-400">Privatisations privées</span>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-terracotta-500 uppercase tracking-widest">
              Réservations & Contact
            </h4>
            <ul className="space-y-3 text-xs text-anthracite-300 font-sans">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-terracotta-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>14 Rue Royale, 69001 Lyon</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-terracotta-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+33478000000" className="hover:text-terracotta-500 transition-colors">+33 (0)4 78 00 00 00</a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-terracotta-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@maracujabellavita.fr" className="hover:text-terracotta-500 transition-colors">contact@maracujabellavita.fr</a>
              </li>
            </ul>
          </div>

          {/* Socials & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-terracotta-500 uppercase tracking-widest">
              L'Expérience Exclusive
            </h4>
            <p className="text-[11px] text-anthracite-400 font-sans leading-relaxed">
              Inscrivez-vous à notre liste d'invités VIP pour recevoir des invitations aux soirées de dégustation de truffes fraîches et de crus classés italiens.
            </p>
            <div className="flex gap-2.5">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full px-3 py-2 text-xs rounded bg-[#0a0a0a] border border-anthracite-800 text-anthracite-200 focus:outline-none focus:border-terracotta-500/50"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-terracotta-400 to-terracotta-600 text-white text-xs font-bold rounded hover:scale-103 transition-transform">
                Rejoindre
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-anthracite-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-anthracite-400 font-sans">
          <span>&copy; {currentYear} Maracuja Bella Vita. Tous droits réservés.</span>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-terracotta-500 transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-terracotta-500 transition-colors">RGPD & Confidentialité</a>
            <a href="#" className="hover:text-terracotta-500 transition-colors">CGV</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
