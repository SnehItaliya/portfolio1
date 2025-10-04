import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Html } from "@react-three/drei";
import { motion } from "framer-motion";

/**
 * 3D PORTFOLIO – Single-file React component
 * - Uses @react-three/fiber + drei for the 3D scene
 * - Tailwind-friendly markup for sleek UI (assumes Tailwind is set up)
 * - Framer Motion for subtle animations
 *
 * HOW TO USE (Create React App / Vite / Next.js):
 * 1) npm i @react-three/fiber @react-three/drei framer-motion
 * 2) Ensure Tailwind CSS is configured (or replace classes with your CSS)
 * 3) Drop this file into your project (e.g., src/App.jsx or app/page.jsx for Next.js)
 * 4) Export default component is provided below
 */

// -------------------- 3D OBJECTS --------------------
function SpinningTetra({ color = "#ff8a00", wire = false }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow>
        <tetrahedronGeometry args={[1.3, 0]} />
        {wire ? (
          <meshBasicMaterial wireframe color={color} />
        ) : (
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        )}
      </mesh>
    </group>
  );
}

function FloatingKnot() {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.z += delta * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} castShadow receiveShadow>
        <torusKnotGeometry args={[0.8, 0.26, 240, 16]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.65} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function Glow({ color = "#f59e0b", intensity = 2 }) {
  return (
    <group>
      <pointLight position={[2, 2, 2]} intensity={intensity} color={color} />
      <pointLight position={[-2, -2, -2]} intensity={intensity * 0.7} color="#60a5fa" />
      <ambientLight intensity={0.35} />
    </group>
  );
}

function SceneBadge() {
  return (
    <Html position={[0, -1.9, 0]} center>
      <div className="rounded-full backdrop-blur bg-white/10 border border-white/20 px-4 py-1 text-xs text-white shadow-lg">
        Interactive Portfolio
      </div>
    </Html>
  );
}

function PortfolioScene() {
  return (
    <group>
      <Glow />
      <Stars radius={80} depth={40} count={1800} factor={4} fade speed={0.6} />
      <FloatingKnot />
      <group position={[2.2, 0.2, -0.6]}>
        <SpinningTetra color="#22d3ee" />
      </group>
      <group position={[-2.4, -0.1, 0.6]}>
        <SpinningTetra color="#f59e0b" wire />
      </group>
      <SceneBadge />
      <OrbitControls enablePan={false} maxDistance={8} minDistance={3} />
    </group>
  );
}

// -------------------- UI BLOCKS --------------------
const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <motion.h2
      className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-white/60 text-sm block mb-2">{kicker}</span>
      {title}
    </motion.h2>
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {children}
    </motion.div>
  </section>
);

function ProjectCard({ title, description, tags = [], href = "#" }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:bg-white/10 transition-all shadow-lg backdrop-blur">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <span className="text-white/40 text-sm group-hover:text-white/70">↗</span>
        </div>
        <p className="mt-2 text-sm text-white/70 leading-relaxed">{description}</p>
        <div className="mt-3 flex gap-2 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="text-xs text-white/70 border border-white/15 rounded-full px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
      <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Full name" required />
      <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Email" type="email" required />
      <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 sm:col-span-2" placeholder="Subject" />
      <textarea className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 sm:col-span-2 min-h-[120px]" placeholder="Message" required />
      <button type="submit" className="sm:col-span-2 rounded-xl px-5 py-3 bg-white text-black font-medium hover:bg-white/90 transition">
        {sent ? "Sent ✓" : "Send message"}
      </button>
    </form>
  );
}

// -------------------- TOP-LEVEL APP --------------------
function Navbar() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="backdrop-blur bg-white/5 border border-white/10 rounded-full px-4 py-2 shadow-lg">
        <ul className="flex items-center gap-3 sm:gap-5">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-white/80 hover:text-white text-sm sm:text-[0.95rem]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative min-h-[80vh]">
      <div className="absolute inset-0">{
        /* 3D CANVAS */
      }
        <Canvas shadows camera={{ position: [0, 1.2, 5.5], fov: 42 }}>
          <Suspense fallback={null}>
            <PortfolioScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-36 pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight text-white"
          >
            Krish Malinga
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-3 text-white/80 text-lg sm:text-xl max-w-2xl"
          >
            Full‑stack developer building delightful, performant experiences. Focused on React, Next.js, Node, and 3D web.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="mt-8 flex items-center gap-3"
          >
            <a href="#projects" className="rounded-xl px-5 py-3 bg-white text-black font-medium hover:bg-white/90 transition">
              View Projects
            </a>
            <a href="#contact" className="rounded-xl px-5 py-3 border border-white/20 text-white hover:bg-white/10 transition">
              Contact
            </a>
          </motion.div>
        </div>
      </div>

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
    </div>
  );
}

function Skills() {
  const skills = [
    "React/Next.js",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "React Three Fiber",
    "PostgreSQL/MySQL",
    "Redis",
    "Docker",
    "CI/CD",
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {skills.map((s) => (
        <div key={s} className="rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-white/90 text-sm text-center">
          {s}
        </div>
      ))}
    </div>
  );
}

export default function Portfolio3DApp() {
  const projects = useMemo(
    () => [
      {
        title: "AI Worksheet Pro",
        description: "Multi‑curriculum generator with quizzes, vocabulary, and export workflows.",
        tags: ["React", "Node", "MySQL", "RAG"],
        href: "#",
      },
      {
        title: "Everglow B2B",
        description: "Jewellery admin portal with dynamic SKUs, Cloudinary media, and Redis caching.",
        tags: ["React", "Express", "Redis", "Cloudinary"],
        href: "#",
      },
      {
        title: "SheridanBites",
        description: "Food‑delivery prototype with clean architecture and testable services.",
        tags: ["Angular", "Node", "MongoDB"],
        href: "#",
      },
      {
        title: "ETL – Pet Rescue Charity",
        description: "Talend pipelines to Oracle star schema; analytics and dashboards.",
        tags: ["Talend", "Oracle", "SQL"],
        href: "#",
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />

      <Section id="about" title="About" kicker="Introduction">
        <p className="text-white/80 leading-relaxed max-w-3xl">
          Builder who loves shipping polished interfaces and solving hard problems end‑to‑end. Obsessed with performance,
          accessibility, and developer ergonomics. Comfortable across the stack from UX to infra.
        </p>
      </Section>

      <Section id="projects" title="Projects" kicker="Work">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills" kicker="Toolkit">
        <Skills />
      </Section>

      <Section id="contact" title="Contact" kicker="Let’s build">
        <ContactForm />
      </Section>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-white/60 text-sm flex items-center justify-between">
        <span>© {new Date().getFullYear()} Krish Malinga</span>
        <a href="#" className="hover:text-white/90">View résumé</a>
      </footer>
    </main>
  );
}
