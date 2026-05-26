"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Pizza {
  name: string;
  price: string;
  desc: string;
  ingredients: string[];
  badge?: string;
  image: string;
}

const PREMIUM_PIZZAS: Pizza[] = [
  {
    name: "La Tartufo Rosso",
    price: "32",
    desc: "L'excellence gastronomique alliée à la noblesse de la terre d'Ombrie.",
    ingredients: [
      "Fior di Latte d'Agerola",
      "Crème de Truffe Noire Sauvage",
      "Lamelles de Truffe Fraîche d'Été",
      "Miel Sauvage",
      "Paillettes d'Or Alimentaire 24k"
    ],
    badge: "Création Signature",
    image: "/images/la_tartufo_rosso.png"
  },
  {
    name: "La Regina di Bronte",
    price: "28",
    desc: "Un hommage intense aux terroirs laitiers et arboricoles siciliens.",
    ingredients: [
      "Pesto de Pistaches de Sicile AOP",
      "Mortadelle Artisanale IGP au pistache",
      "Burrata Crémeuse de Bufflonne entière (125g)",
      "Pistaches de Bronte Torréfiées"
    ],
    badge: "Le Grand Cru",
    image: "/images/la_regina_di_bronte.png"
  },
  {
    name: "L'Origine Volcanique VILLARD",
    price: "22",
    desc: "La pure tradition napolitaine élevée à son paroxysme d'authenticité.",
    ingredients: [
      "Tomates San Marzano DOP broyées",
      "Mozzarella di Bufala Campana AOP",
      "Huile d'olive extra-vierge AOP du Vésuve",
      "Basilic Frais cueilli au lever du jour"
    ],
    badge: "Classique d'Origine",
    image: "/images/lorigine_volcanique.png"
  }
];

export default function PizzaMenu() {
  return (
    <section id="menu" className="relative py-32 px-6 md:px-12 bg-[#08080a] border-t border-anthracite-800">
      {/* Subtle light accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-terracotta-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">

        {/* Section Title */}
        <div className="text-center space-y-4 mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-terracotta-500 font-bold font-sans">
            La Sélection Culinaire
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-anthracite-50">
            Notre Carte d'Exception
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-terracotta-300 to-terracotta-500 mx-auto" />
          <p className="text-anthracite-400 max-w-lg mx-auto text-sm font-sans font-light leading-relaxed">
            Trois chefs-d'œuvre façonnés à la main et cuits en 60 secondes dans notre four à bois en pierre volcanique.
          </p>
        </div>

        {/* 3-Card Static Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {PREMIUM_PIZZAS.map((pizza) => (
            <motion.div
              key={pizza.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-anthracite-800 bg-[#0a0a0c]/80 backdrop-blur-md transition-all duration-500 hover:border-terracotta-500/30 hover:shadow-[0_20px_50px_rgba(214,90,49,0.06)]"
            >
              {/* Image Container (dominating 60% of visual height layout) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-anthracite-950">
                {pizza.badge && (
                  <span className="absolute left-6 top-6 z-20 px-3.5 py-1 rounded-md text-[9px] uppercase tracking-[0.2em] font-bold bg-[#08080a]/90 text-gold-400 border border-gold-500/20 backdrop-blur-sm">
                    {pizza.badge}
                  </span>
                )}
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true}
                    className="object-cover"
                  />
                </div>
                {/* Visual refinement: elegant dark overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Text / Details (Generous spacing for premium feel) */}
              <div className="flex-1 p-8 flex flex-col justify-between space-y-8">
                
                {/* Title & Price */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-serif text-2xl font-bold text-anthracite-50 group-hover:text-terracotta-400 transition-colors duration-300">
                      {pizza.name}
                    </h3>
                    <div className="flex items-baseline text-gold-400 font-serif font-bold text-2xl shrink-0">
                      <span>{pizza.price}</span>
                      <span className="text-xs ml-0.5 font-light">€</span>
                    </div>
                  </div>
                  <p className="text-anthracite-300 text-xs leading-relaxed font-sans font-light">
                    {pizza.desc}
                  </p>
                </div>

                {/* Composition (Editorial style) */}
                <div className="pt-6 border-t border-anthracite-800/40">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-terracotta-500/80 font-bold block mb-2">
                    Ingrédients d'Exception
                  </span>
                  <p className="text-anthracite-400 text-xs leading-relaxed font-sans font-light tracking-wide">
                    {pizza.ingredients.join(" • ")}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/33600000000?text=Bonjour,%20je%20souhaite%20commander%20la%20pizza%20${encodeURIComponent(pizza.name)}%20!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 rounded-xl border border-anthracite-800 group-hover:border-terracotta-500/40 group-hover:bg-terracotta-500/[0.03] text-anthracite-300 group-hover:text-terracotta-400 font-sans text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500"
                >
                  Commander la Création
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
