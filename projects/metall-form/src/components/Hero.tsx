"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ChevronDown, ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate grid lines
      gsap.to(".grid-line", {
        opacity: 0.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
      });

      // Parallax effect on scroll
      gsap.set(".hero-content", { y: 0 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-black)]"
    >
      {/* Industrial Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(8,8,8,0.5)]" />

      {/* Accent Glow Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl filter"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2.5, delay: 0.3 }}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl filter"
      />

      {/* Content */}
      <div className="relative h-screen flex flex-col items-center justify-center px-6 hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto space-y-6"
        >
          {/* Section Label */}
          <motion.div variants={itemVariants} className="section-rule justify-center">
            <span className="section-label">Engenharia Industrial</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold leading-none tracking-tighter"
          >
            <span className="text-white">Engenharia Aplicada</span>
            <br />
            <span className="gradient-text-accent">À Produção</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed"
          >
            Soluções industriais em perfilamento contínuo, automação e integração
            de processos. Especialista em linhas de produção de alta performance
            para empresas que não aceitam compromissos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <button className="btn-primary group">
              Solicitar Demonstração
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary">Conhecer Soluções</button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
              Deslize para explorar
            </span>
            <ChevronDown
              size={20}
              className="text-[var(--accent)]"
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.05) 2px,
            rgba(0,0,0,0.05) 4px
          )`,
        }} />
      </div>
    </div>
  );
}
