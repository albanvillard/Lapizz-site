"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoSvg from "@/assets/logo.svg";

const NAV_ITEMS = [
  { name: "La Carte", href: "#menu" },
  { name: "Notre Histoire", href: "#histoire" },
  { name: "L'Artisanat", href: "#artisanat" },
  { name: "Réservations", href: "#reservations" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12">
      <nav className="mx-auto max-w-7xl glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">

        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 transition-transform duration-500 group-hover:rotate-12 neon-glow-subtle">
            <Image
              src={logoSvg}
              alt="L'Oro di Napoli Neon Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-widest text-xl md:text-2xl font-semibold text-[#f9f6f0] leading-none">
              L'ORO DI NAPOLI
            </span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gold-300 font-bold font-sans mt-1">
              PIZZERIA HAUTE COUTURE
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.name} className="relative">
                <a
                  href={item.href}
                  className="relative px-3 py-2 text-sm tracking-wide text-[#f9f6f0] hover:text-gold-300 transition-colors duration-300 font-medium font-sans"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.name}
                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="navHover"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-300 to-gold-500 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#reservations"
            className="px-5 py-2.5 rounded-xl border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-[#08080a] font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_0_15px_rgba(223,168,74,0.1)] hover:shadow-[0_0_25px_rgba(223,168,74,0.25)] hover:scale-105"
          >
            Table Privée
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gold-400 hover:text-gold-300 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-24 left-6 right-6 z-40 glass rounded-2xl p-6 shadow-2xl md:hidden flex flex-col gap-6"
          >
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-serif text-[#f9f6f0] hover:text-gold-300 transition-colors py-2 border-b border-anthracite-800"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#reservations"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-[#08080a] font-sans text-xs uppercase tracking-widest font-bold hover:scale-102 transition-all duration-300"
            >
              Réserver une Table Privée
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
