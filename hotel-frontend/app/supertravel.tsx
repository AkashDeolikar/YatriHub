// 'use client';

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { ReactNode } from "react";

// /* =========================
//    🔹 TYPES
// ========================= */
// type Service = {
//   name: string;
//   desc: string;
//   icon: ReactNode;
//   href: string;
//   status?: "live" | "beta" | "offline";
// };

// type Props = {
//   services: Service[];
// };

// /* =========================
//    🔹 MAIN COMPONENT
// ========================= */
// export default function EcosystemSection({ services }: Props) {
//   return (
//     <section className="relative py-32 bg-[#050505] overflow-hidden">

//       {/* 🌌 MULTI-LAYER BACKGROUND */}
//       <Background />

//       <div className="max-w-7xl mx-auto px-6 relative z-10">

//         {/* ================= HEADER ================= */}
//         <Header />

//         {/* ================= GRID ================= */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, i) => (
//             <ServiceCard key={service.name} service={service} index={i} />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// /* =========================
//    🔹 HEADER
// ========================= */
// function Header() {
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//       >
//         <p className="text-[10px] tracking-[0.4em] text-indigo-400 uppercase mb-4">
//           Ecosystem
//         </p>

//         <h2 className="text-5xl md:text-7xl font-semibold text-white leading-tight tracking-tight">
//           Intelligent Travel
//           <br />
//           <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
//             Super Platform
//           </span>
//         </h2>

//         <p className="text-zinc-500 mt-6 max-w-md text-sm leading-relaxed">
//           A distributed travel ecosystem integrating mobility, hospitality,
//           dining, and real-time intelligence into one unified experience layer.
//         </p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//       >
//         <Link
//           href="/travel"
//           className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
//         >
//           Explore ecosystem
//           <span className="text-indigo-400 group-hover:translate-x-1 transition">
//             →
//           </span>
//         </Link>
//       </motion.div>
//     </div>
//   );
// }

// /* =========================
//    🔹 SERVICE CARD (CORE UPGRADE)
// ========================= */
// function ServiceCard({
//   service,
//   index,
// }: {
//   service: Service;
//   index: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.08, duration: 0.6 }}
//       viewport={{ once: true }}
//     >
//       <Link href={service.href}>
//         <div className="group relative h-full p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-indigo-500/50 hover:to-purple-500/50 transition-all">

//           {/* CARD CORE */}
//           <div className="relative h-full rounded-2xl bg-white/[0.03] backdrop-blur-xl p-6 border border-white/10 overflow-hidden">

//             {/* 🌟 ACTIVE STATE GLOW */}
//             <motion.div
//               initial={false}
//               animate={{ opacity: 0 }}
//               whileHover={{ opacity: 1 }}
//               className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
//             />

//             {/* 🟢 STATUS BADGE */}
//             <StatusBadge status={service.status} />

//             {/* ICON */}
//             <motion.div
//               whileHover={{ scale: 1.15, rotate: 5 }}
//               className="text-3xl text-indigo-400 mb-5"
//             >
//               {service.icon}
//             </motion.div>

//             {/* TITLE */}
//             <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
//               {service.name}
//             </h3>

//             {/* DESCRIPTION */}
//             <p className="text-sm text-zinc-500 leading-relaxed">
//               {service.desc}
//             </p>

//             {/* FOOTER INTERACTION */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               whileHover={{ opacity: 1, y: 0 }}
//               className="mt-6 flex items-center gap-2 text-xs text-indigo-400"
//             >
//               Explore module →
//             </motion.div>

//             {/* ⚡ SHIMMER */}
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[linear-gradient(120deg,transparent,white,transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />

//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

// /* =========================
//    🔹 STATUS BADGE (FAANG TOUCH)
// ========================= */
// function StatusBadge({ status = "live" }: { status?: string }) {
//   const styles = {
//     live: "bg-emerald-500/10 text-emerald-400",
//     beta: "bg-yellow-500/10 text-yellow-400",
//     offline: "bg-rose-500/10 text-rose-400",
//   };

//   return (
//     <div className="absolute top-4 right-4 text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-widest backdrop-blur-sm border border-white/10"
//       style={{}}
//     >
//       <span className={styles[status as keyof typeof styles]}>
//         {status}
//       </span>
//     </div>
//   );
// }

// /* =========================
//    🔹 BACKGROUND SYSTEM (FAANG DEPTH)
// ========================= */
// function Background() {
//   return (
//     <>
//       {/* Base Gradients */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_40%)]" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_40%)]" />

//       {/* Animated Grid */}
//       <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

//       {/* Floating Glow */}
//       <motion.div
//         animate={{ y: [0, -30, 0] }}
//         transition={{ duration: 10, repeat: Infinity }}
//         className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full"
//       />
//     </>
//   );
// }


'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

/* =========================
   🔹 TYPES
========================= */
type Experience = {
  name: string;
  desc: string;
  cat: string;
  num: string;
};

type Props = {
  experiences?: Experience[];
};

/* =========================
   🔹 MAIN COMPONENT
========================= */
export default function DiscoverySection({
  experiences = defaultExperiences,
}: Props) {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">

      <Background />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <Header />

        <FeaturedCard />

        <ExperienceGrid experiences={experiences} />

        <FooterNote />

      </div>
    </section>
  );
}

/* =========================
   🔹 HEADER
========================= */
function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">

      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-xs tracking-[0.5em] text-indigo-400 uppercase">
            Discovery
          </span>
          <div className="h-px w-14 bg-indigo-400/30" />
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-semibold text-white leading-tight tracking-tight">
          Curated Experiences
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Powered by Intelligence
          </span>
        </h2>

        <p className="text-zinc-500 mt-6 max-w-lg text-sm leading-relaxed">
          A dynamic discovery engine adapting to your journey — blending wellness,
          culture, food, and adventure into a unified experience layer.
        </p>
      </div>

      <Link
        href="/discovery"
        className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.25em] text-zinc-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
      >
        Explore All
        <FaArrowRight className="text-indigo-400 group-hover:translate-x-1.5 transition" size={10} />
      </Link>
    </div>
  );
}

/* =========================
   🔹 FEATURED CARD
========================= */
function FeaturedCard() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="mb-16 relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
        <div>
          <p className="text-xs tracking-widest text-indigo-400 mb-4">
            Featured Experience
          </p>

          <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Himalayan Wellness Retreat
          </h3>

          <p className="text-zinc-500 max-w-md">
            A 3-day immersive journey combining meditation, spa therapy,
            and guided mountain exploration.
          </p>
        </div>

        <button className="flex items-center gap-2 text-indigo-400 text-sm group">
          Discover Now
          <FaArrowRight className="group-hover:translate-x-1 transition" />
        </button>
      </div>
    </motion.div>
  );
}

/* =========================
   🔹 GRID
========================= */
function ExperienceGrid({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {experiences.map((exp, i) => (
        <ExperienceCard key={exp.name} exp={exp} index={i} />
      ))}
    </div>
  );
}

/* =========================
   🔹 CARD
========================= */
function ExperienceCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <Link href={`/discovery?cat=${exp.cat}`}>
        <div className="group relative h-[320px] p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-indigo-500/40 hover:to-purple-500/40 transition">

          <div className="relative h-full rounded-2xl bg-[#050505] border border-white/10 p-8 overflow-hidden">

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 transition" />

            {/* Background Number */}
            <span className="absolute top-6 right-6 text-5xl font-serif italic text-white/[0.04] group-hover:text-indigo-400/10 transition">
              {exp.num}
            </span>

            {/* Content */}
            <div className="relative z-10 mt-auto flex flex-col justify-end h-full">
              <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition">
                {exp.name}
              </h4>

              <p className="text-sm text-zinc-500 group-hover:text-zinc-300 transition">
                {exp.desc}
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wider text-indigo-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                Explore <FaArrowRight size={10} />
              </div>
            </div>

            {/* Shine */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[linear-gradient(120deg,transparent,white,transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition duration-1000" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* =========================
   🔹 FOOTER NOTE
========================= */
function FooterNote() {
  return (
    <div className="mt-24 text-center">
      <p className="text-zinc-600 text-sm tracking-wide">
        AI-curated journeys • Personalized in real-time • Designed for explorers
      </p>
    </div>
  );
}

/* =========================
   🔹 BACKGROUND
========================= */
function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.12),transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
    </>
  );
}

/* =========================
   🔹 DEFAULT DATA
========================= */
const defaultExperiences: Experience[] = [
  {
    name: "Wellness Retreat",
    desc: "Meditation & spa experiences in the Himalayas.",
    cat: "wellness",
    num: "01",
  },
  {
    name: "Cultural Trails",
    desc: "Explore heritage and local traditions.",
    cat: "culture",
    num: "02",
  },
  {
    name: "Food Journeys",
    desc: "Taste curated regional cuisines.",
    cat: "food",
    num: "03",
  },
  {
    name: "Adventure Trips",
    desc: "Thrill-driven outdoor exploration.",
    cat: "adventure",
    num: "04",
  },
];