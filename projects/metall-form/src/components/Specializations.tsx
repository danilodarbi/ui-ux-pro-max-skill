"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Specializations() {
  const containerRef = useRef<HTMLDivElement>(null);

  const specialties = [
    "Corte em Voo",
    "Cisalhamento Avançado",
    "Ferramentais Roll Forming",
    "Estampo de Precisão",
    "Projetos 100% Customizados",
    "Linhas para Porta Pallets",
    "Produção Contínua",
    "NR-12 Compliance",
    "Automação de Processos",
    "Integração CNC",
    "Retrofit e Modernização",
    "Suporte Técnico 24/7",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".specialty-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
        },
        opacity: 0,
        x: -30,
        stagger: 0.08,
        duration: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="especialidades"
      className="relative py-20 md:py-32 bg-[var(--bg-black)]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-sm opacity-25" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-rule mb-6"
          >
            <span className="section-label">Especialidades</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold leading-tight"
          >
            Áreas de<br />
            <span className="text-[var(--accent)]">Especialização Técnica</span>
          </motion.h2>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty}
              className="specialty-item group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-start gap-4 p-5 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent-border)] transition-all duration-300 group-hover:bg-[rgba(232,98,42,0.05)]">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="p-2 bg-[rgba(232,98,42,0.1)] border border-[var(--accent-border)] rounded-lg">
                    <Check
                      size={18}
                      className="text-[var(--accent)]"
                      strokeWidth={3}
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-base font-medium text-[var(--text-primary)]">
                    {specialty}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider mt-20" />
      </div>
    </section>
  );
}
