"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} id="contato" className="relative py-20 md:py-32 bg-[var(--bg-black)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Large accent glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl filter"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl filter"
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 py-12"
        >
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-rule justify-center"
          >
            <span className="section-label">Próximo Passo</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight"
          >
            Transforme sua<br />
            <span className="text-[var(--accent)]">Produção Industrial</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
          >
            Solicite uma consulta técnica gratuita com nossos especialistas em
            engenharia industrial. Vamos analisar sua linha de produção e
            apresentar soluções customizadas para seus desafios específicos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <a href="https://wa.me/551733333333" target="_blank" rel="noopener noreferrer" className="btn-primary group">
              Enviar Mensagem
              <MessageCircle size={16} />
            </a>

            <a href="tel:+5517" className="btn-secondary group">
              <Phone size={16} />
              Ligar para Metall Form
            </a>
          </motion.div>

          {/* Trust/Credibility */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-8 space-y-4"
          >
            <div className="flex flex-wrap justify-center gap-6 text-center text-sm text-[var(--text-muted)]">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">500+</p>
                <p>Máquinas Instaladas</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">20+</p>
                <p>Anos de Experiência</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">150+</p>
                <p>Clientes Ativos</p>
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
              Resposta em até 24 horas
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
