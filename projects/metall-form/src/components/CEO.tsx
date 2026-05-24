"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export function CEO() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 bg-[var(--bg-black)]"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Accent glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl filter"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-rule mb-6"
          >
            <span className="section-label">Liderança</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold leading-tight"
          >
            Rafhael Cunha<br />
            <span className="text-[var(--accent)]">CEO & Estrategista Industrial</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative h-96 md:h-[500px] bg-gradient-to-br from-[var(--accent)] to-[var(--bg-elevated)] rounded-lg overflow-hidden group"
          >
            {/* Placeholder content */}
            <div className="absolute inset-0 bg-[rgba(232,98,42,0.05)] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-display font-bold text-[var(--accent)] opacity-20 mb-4">
                  RC
                </div>
                <p className="text-[var(--text-muted)] uppercase tracking-wider">
                  Fotografia em breve
                </p>
              </div>
            </div>

            {/* Border accent */}
            <div className="absolute inset-0 border border-[var(--accent-border)] rounded-lg" />
          </motion.div>

          {/* Biography & Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
                Rafhael Cunha é o fundador e CEO da Metall Form, liderando a
                empresa na posição de estrategista de engenharia industrial e
                inovação em manufatura.
              </p>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Sua visão é transformar a manufatura industrial brasileira
                através de soluções de engenharia de classe mundial,
                integrando automação inteligente, precisão e confiabilidade
                operacional em cada projeto.
              </p>
            </div>

            {/* Expertise */}
            <div className="space-y-4">
              <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                Áreas de Expertise
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Engenharia Industrial",
                  "Automação Avançada",
                  "Otimização de Processos",
                  "Estratégia de Manufatura",
                  "Inovação Tecnológica",
                  "Gestão de Projetos",
                ].map((expertise) => (
                  <div
                    key={expertise}
                    className="px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent-border)] transition-colors"
                  >
                    <p className="text-sm text-[var(--text-primary)] font-medium">
                      {expertise}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ x: 4 }}
              className="btn-primary"
            >
              Agendar conversa com Rafhael
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
