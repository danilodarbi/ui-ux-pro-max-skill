"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AuthorityStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  const capabilities = [
    "Engenharia Industrial",
    "Automação Integrada",
    "Produção Contínua",
    "Projetos Customizados",
    "Compliance NR-12",
    "Alta Performance",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".capability-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "center center",
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-16 md:py-24 bg-[var(--bg-dark)] border-y border-[var(--border)]"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-rule"
          >
            <span className="section-label">Capacidades</span>
          </motion.div>
        </div>

        {/* Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability}
              className="capability-item group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent-border)] transition-all duration-300 group-hover:bg-[rgba(232,98,42,0.04)]">
                {/* Number */}
                <div className="text-3xl font-display font-bold text-[var(--accent)] mb-4">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Text */}
                <p className="text-base font-medium text-[var(--text-primary)]">
                  {capability}
                </p>

                {/* Accent line */}
                <div className="mt-4 h-1 w-12 bg-[var(--accent)] rounded-full group-hover:w-20 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
