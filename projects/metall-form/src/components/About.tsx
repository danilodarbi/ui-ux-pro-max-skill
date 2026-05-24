"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: "20+", label: "Anos de Experiência" },
    { value: "500+", label: "Máquinas Instaladas" },
    { value: "150+", label: "Clientes Ativos" },
    { value: "24/7", label: "Suporte Técnico" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="sobre"
      className="relative py-20 md:py-32 bg-[var(--bg-black)]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl filter"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-rule mb-6"
          >
            <span className="section-label">Sobre a Empresa</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold leading-tight"
          >
            Metall Form<br />
            <span className="text-[var(--accent)]">Máquinas e Equipamentos</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Localizada em Mirassol, São Paulo, a Metall Form é uma empresa
              especializada em engenharia industrial e manufatura de máquinas
              de perfilamento contínuo (roll forming) de alta performance.
            </p>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Sob a liderança do CEO Rafhael Cunha, desenvolvemos soluções
              customizadas de automação integrada para linhas de produção que
              demandam precisão, confiabilidade e produtividade sem
              compromissos.
            </p>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Nossa expertise cobre desde engenharia de projeto até instalação,
              integração de processos, automação completa e suporte técnico
              24/7, atendendo especialmente o segmento de manufatura industrial
              de médio a grande porte.
            </p>

            <motion.button
              whileHover={{ x: 4 }}
              className="btn-secondary mt-8"
            >
              Saiba mais sobre nossa história
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item p-6 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent-border)] transition-all duration-300 hover:bg-[rgba(232,98,42,0.04)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-[var(--accent)] mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider" />
      </div>
    </section>
  );
}
